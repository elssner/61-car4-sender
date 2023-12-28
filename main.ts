input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    btSendeZahl += -5
    _4digit.show(btSendeZahl)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    btSendeZahl += 5
    _4digit.show(btSendeZahl)
})
let btSendeZahl = 0
let _4digit: grove.TM1637 = null
_4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
radio.setGroup(240)
btSendeZahl = 90
loops.everyInterval(200, function () {
    bit.comment("0 Motor 0..128..255")
    bit.comment("1 Servo 0..128..255")
    radio.sendNumber(qwiicjoystick.readJoystick(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20)))
})
