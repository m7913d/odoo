/** @odoo-module **/

import { _lt } from "@web/core/l10n/translation";
import { formatValue } from "@web/core/domain_tree";
import { sprintf } from "@web/core/utils/strings";

/**
 * @typedef {Object} OperatorInfo
 * @property {import("@web/core/domain_tree").Value} operator
 * @property {string} label
 * @property {number|"variable"} valueCount
 */

export const OPERATOR_DESCRIPTIONS = {
    // valid operators (see TERM_OPERATORS in expression.py)
    "=": { label: "=", valueCount: 1 },
    "!=": { label: "!=", valueCount: 1 },
    "<=": { label: "<=", valueCount: 1 },
    "<": { label: "<", valueCount: 1 },
    ">": { label: ">", valueCount: 1 },
    ">=": { label: ">=", valueCount: 1 },
    "=?": { label: "=?", valueCount: 1 },
    "=like": { label: _lt("=like"), valueCount: 1 },
    "=ilike": { label: _lt("=ilike"), valueCount: 1 },
    like: { label: _lt("like"), valueCount: 1 },
    "not like": { label: _lt("not like"), valueCount: 1 },
    ilike: { label: _lt("contains"), valueCount: 1 },
    "not ilike": { label: _lt("does not contain"), valueCount: 1 },
    in: { label: _lt("is in"), valueCount: "variable" },
    "not in": { label: _lt("is not in"), valueCount: "variable" },
    child_of: { label: _lt("child of"), valueCount: 1 },
    parent_of: { label: _lt("parent of"), valueCount: 1 },

    // virtual operators (replace = and != in some cases)
    is: { label: _lt("is"), valueCount: 1 },
    is_not: { label: _lt("is not"), valueCount: 1 },
    set: { label: _lt("is set"), valueCount: 0 },
    not_set: { label: _lt("is not set"), valueCount: 0 },

    // virtual operator (equivalent to a couple (>=,<=))
    between: { label: _lt("is between"), valueCount: 2 },
};

/**
 * @param {import("@web/core/domain_tree").Value} operator
 * @param {boolean} [negate=false]
 * @returns {OperatorInfo}
 */
export function getOperatorInfo(operator, negate = false) {
    let operatorInfo;
    if (typeof operator === "string" && operator in OPERATOR_DESCRIPTIONS) {
        const { label, valueCount } = OPERATOR_DESCRIPTIONS[operator];
        operatorInfo = { key: operator, label: label.toString(), operator, negate, valueCount };
    } else {
        operatorInfo = {
            key: "__unknown__",
            label: formatValue(operator),
            operator,
            negate,
            valueCount: 0,
        };
    }
    if (negate) {
        operatorInfo.label = sprintf(`not %s`, operatorInfo.label);
    }
    return operatorInfo;
}

/**
 * @param {import("@web/core/domain_tree").Value[]} operators
 * @returns {(OperatorInfo)[]}
 */
export function selectOperators(operators) {
    return operators.map((operator) => getOperatorInfo(operator));
}
