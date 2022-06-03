var operatorTable = {}

function init_operator_table() {
    operatorTable['+'] = (a,b) => {return a + b}
    operatorTable['-'] = (a,b) => {return a - b}
    operatorTable['x'] = (a,b) => {return a * b}
    operatorTable['/'] = (a,b) => {return a / b}
}

init_operator_table()

function parse_calculation(text, stored_val) {
    console.clear()
    console.log("Begin parsing")
    return parse_calculation_imp(null, null, text, stored_val)
}

function parse_calculation_imp(val, operator, text, stored_val) {
    console.log(val, operator, text, stored_val)

    // Calculation ended
    if (text.length == 0) {
        if (operator != null)
            return null
        else
            return val
    }

    // Collect new val
    if (val == null || operator != null) {
        var new_val = null
        if (text.charAt(0) == 'r') {
            if (stored_val == null)
                return null
            new_val = stored_val
            text = text.substring(1, text.length)
        }
        else if (text.charAt(0) == '(') {
            [new_val, text] = parse_brackets(text, stored_val)
        }
        else
            [new_val, text] = parse_float(text)
        
        console.log("New val: " + new_val)
        if (new_val == null)
            return null

        if (operator != null)
            return parse_calculation_imp(operator(val, new_val), null, text, stored_val)
        else
            return parse_calculation_imp(new_val, null, text, stored_val)
    }
    // Collect new operator
    else {
        operator = operatorTable[text.charAt(0)]
        if (operator == null)
            return null
        else
            return parse_calculation_imp(val, operator, text.substring(1, text.length), stored_val)
    }
}

function parse_brackets(text, stored_val) {
    var bracket_count = 1
    var i = 1
    while (bracket_count > 0) {
        if (i > text.length)
            return null
        if (text.charAt(i) == '(')
            bracket_count += 1
        else if (text.charAt(i) == ')')
            bracket_count -= 1
        i += 1
    }
    console.log("Subcall")
    return [parse_calculation_imp(null, null, text.substring(1, i-1), stored_val), text.substring(i, text.length)]
}

function parse_float(text) {
    var new_val = parseFloat(text)
    if (isNaN(new_val))
        return null, null
    str = "" + new_val
    return [new_val, text.substring(str.length, text.length)]
}