import { GraphQLScalarType, Kind } from 'graphql';


export const GraphQLDate = new GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar type for dates',
    parseValue(inputValue: unknown) {
        if (typeof inputValue !== 'string') {
            throw new Error("Invalid input value. Date string expected.");
        }
        const date = new Date(inputValue);
        if(isNaN(date.getTime())) {
            throw new Error("Invalid date format.");
        }
        return date;
    },
    serialize(outputValue: unknown) {
        if (typeof outputValue === 'string') {
            try {
                return new Date(outputValue).toISOString().split('T')[0];
            } catch (e) {
                console.warn(`Cannot serialize non-date string ${outputValue}: ${e}`);
                return outputValue;
            }
        } else if (outputValue instanceof Date) {
            return outputValue.toISOString().split('T')[0]; // original formatting
        } else {
            console.warn(`Non-date value for outputValue ${outputValue}`);
            return outputValue;
        }
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const date = new Date(ast.value);
            if(isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
            return date;
        }
        return null;
    },
});
