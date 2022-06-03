
var calculator_element = document.getElementById("calculator")
var stored_result_element = null
var current_result_element = null
var calculation_element = null

var stored_result = null
var current_result = null
var calculation_text = ""

const CALCULATION_EMPTY = "Enter calculation"
const CURRENT_RESULT_PREFIX = "Current result = \n"
const STORED_RESULT_PREFIX = "Stored result = \n"
const RESULT_EMPTY = "..."

// Classes for CSS beautification
const CALCULATOR_CLASS = "calculator"
const DISPLAY_CLASS = "calculator-display"
const KEYPAD_CLASS = "calculator-keypad"
const KEYPAD_ROW_CLASS = "calculator-keypad-row"
const BUTTON_CLASS = "calculator-button"
const TEXT_CLASS = "calculator-text"

init_calculator()

function init_calculator() {
    assemble_calculator(calculator_element)
}

function assemble_calculator(calculator_element) {
    display_element = assemble_display()
    keypad_element = assemble_keypad()

    calculator_element.appendChild(display_element)
    calculator_element.appendChild(keypad_element);

    updateCalculationElement()
    updateCurrentResultElement()
    updateStoredResultElement()
}

function assemble_display() {
    // Assemble sub-elements
    display_element = document.createElement("div")
    display_element.classList.add(DISPLAY_CLASS)

    stored_result_element = document.createElement("div")
    stored_result_element.classList.add(TEXT_CLASS)

    current_result_element = document.createElement("div")
    current_result_element.classList.add(TEXT_CLASS)

    calculation_element = document.createElement("div")
    calculation_element.classList.add(TEXT_CLASS)

    // Append sub-elements
    display_element.appendChild(stored_result_element)
    display_element.appendChild(current_result_element)
    display_element.appendChild(calculation_element)

    return display_element
}

function assemble_keypad() {
    keypad_element = document.createElement("div");
    keypad_element.classList.add(KEYPAD_CLASS)

    const button_lists = [ "+-x/", "789<", "456(", "123)", "0.r=^" ]

    button_lists.forEach((button_list) => keypad_element.appendChild(assemble_keypad_row(button_list)))

    return keypad_element
}

function assemble_keypad_row(buttons) {
    keypad_row = document.createElement("div")
    keypad_row.classList.add(KEYPAD_ROW_CLASS)

    Array.from(buttons).forEach((c) => keypad_row.appendChild(assemble_button(c)))

    return keypad_row
}

function assemble_button(c) {
    button = document.createElement("button")
    button.classList.add(BUTTON_CLASS)
    button.innerHTML = c
    button.onclick = () => { buttonOnClick(c) }

    return button
}

function buttonOnClick(c) {
    var is_number = true
    switch (c) {
        case '=':
            if (current_result != null) {
                stored_result = current_result
                calculation_text = ""
            }
            is_number = false
            break
        case '<':
            calculation_text = (calculation_text.length == 0)
                ? ""
                : calculation_text.substring(0, calculation_text.length-1)
            is_number = false
            break
        case 'r':
            if (stored_result != null)
                calculation_text += c
            is_number = false
            break
        case '^':
            if (current_result != null)
                stored_result = current_result
            is_number = false
            break
    }
    if (is_number)
        calculation_text += c

    updateCalculationElement()
    updateCurrentResultElement()
    updateStoredResultElement()
}

function updateCalculationElement() {
    calculation_element.innerHTML = (calculation_text.length == 0)
        ? CALCULATION_EMPTY
        : calculation_text
}

function updateCurrentResultElement() {
    current_result = parse_calculation(calculation_text, stored_result)

    current_result_element.innerHTML = CURRENT_RESULT_PREFIX
    if (current_result == null)
        current_result_element.innerHTML += RESULT_EMPTY
    else
        current_result_element.innerHTML += current_result
}

function updateStoredResultElement() {
    stored_result_element.innerHTML = STORED_RESULT_PREFIX
    if (stored_result == null)
        stored_result_element.innerHTML += RESULT_EMPTY
    else
        stored_result_element.innerHTML += stored_result
}
