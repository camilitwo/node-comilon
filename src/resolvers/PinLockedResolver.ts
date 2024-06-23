import { Arg, Query, Resolver } from 'type-graphql';
import { AppDataSource } from '../ormconfig';
import { PinEstadoLog } from "../entity/pin-estado-log";
import { PinRules } from "../entity/pin-rules";
import {PinResponse} from "./response/PinResponse";

const pinEstadoRepository = AppDataSource.getRepository(PinEstadoLog);
const pinRulesRepository = AppDataSource.getRepository(PinRules);

@Resolver()
export class PinLockedResolver {

    @Query(() => PinResponse, { nullable: true })
    async isBeneficiaryBlocked(@Arg('per_rut') per_rut: string): Promise<PinResponse | null> {
        const pinEstadoLog = await pinEstadoRepository.findOne({ where: { beneficiario_id: per_rut } });
        let response: PinResponse = { locked: false, typeLock: "" };
        if (!pinEstadoLog) return response;

        const { intento, bloque, fcha_expiracion, pin_rules_id } = pinEstadoLog;
        const pinRule = await pinRulesRepository.findOne({ where: { orden: pin_rules_id } });

        if (!pinRule) throw new Error(`No se encontró una regla para el bloque ${bloque}`);

        const { tiempo_penalizado, estado } = pinRule;



        // @ts-ignore
        if (intento >= 3 && bloque < 3) {
            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            // @ts-ignore
            if (formattedDate < fcha_expiracion) {
                response.locked = true;
                response.typeLock = estado === "PERMANENTE" ? "Permanente" : "Temporal";
            }
        }else { // @ts-ignore
            if (bloque >= 3 && intento >= 3){
                        response.locked = true;
                        response.typeLock = "Permanente";
                    }
        }

        return response;
    }

    //insert in PinEstadoLog
    @Query(() => PinEstadoLog, { nullable: true })
    async upsertPinEstadoLog(
        @Arg('per_rut') per_rut: string,
    ): Promise<PinEstadoLog | null> {
        const pinEstadoLogRepo = pinEstadoRepository;
        const pinRulesRepo = pinRulesRepository;

        let existingPinEstadoLog = await pinEstadoLogRepo.findOne({ where: { beneficiario_id: per_rut } });

        if (!existingPinEstadoLog) {
            existingPinEstadoLog = new PinEstadoLog();
            existingPinEstadoLog.beneficiario_id = per_rut;
            existingPinEstadoLog.intento = 0;
            existingPinEstadoLog.bloque = 1;
        }

        // update intento and bloque
        // @ts-ignore
        existingPinEstadoLog.intento += 1;
        // @ts-ignore
        if (existingPinEstadoLog.intento > 3) {
            // @ts-ignore
            existingPinEstadoLog.bloque += 1;
            existingPinEstadoLog.intento = 1;
        }

        // set ultimo_intento to current time
        existingPinEstadoLog.ultimo_intento = new Date();

        // set fcha_expiracion to 24 hours after ultimo_intento
        existingPinEstadoLog.fcha_expiracion = new Date(existingPinEstadoLog.ultimo_intento.getTime() + 24*60*60*1000);

        // update pin_rules_id according to bloque
        // @ts-ignore
        const pinRule = await pinRulesRepo.findOne({ where: { id: existingPinEstadoLog.bloque } });
        if (pinRule) {
            existingPinEstadoLog.pin_rules_id = pinRule.id;
        } else {
            throw new Error(`No se encontró una regla para el bloque ${existingPinEstadoLog.bloque}`);
        }

        await pinEstadoLogRepo.save(existingPinEstadoLog);
        return existingPinEstadoLog;
    }
}
