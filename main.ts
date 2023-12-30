input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (iDisplay > 0) {
        iDisplay += -1
    }
    basic.showNumber(iDisplay)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (iDisplay < 3) {
        iDisplay += 1
    }
    basic.showNumber(iDisplay)
})
function fDisplay () {
    if (i2c.between(iDisplay, 0, 3)) {
        _4digit.show(sendeBuffer.getUint8(iDisplay))
    }
}
let iServo = 0
let iMotor = 0
let iDisplay = 0
let sendeBuffer: i2c.i2cclass = null
let _4digit: grove.TM1637 = null
_4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
let aJoy = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.B_0_255)
radio.setGroup(240)
sendeBuffer = i2c.create(4)
iDisplay = 0
loops.everyInterval(400, function () {
    basic.setLedColor(7)
    aJoy = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.B_0_255)
    iMotor = aJoy[0]
    i2c.comment("0 Motor 0..128..255")
    if (i2c.between(iMotor, 120, 136)) {
        iMotor = 128
    }
    iServo = aJoy[1]
    iServo = Math.round(Math.map(iServo, 0, 255, 135, 45))
    i2c.comment("1 Servo 0..128..255 -> 45..90..135")
    if (i2c.between(iServo, 86, 94)) {
        iServo = 90
    }
    sendeBuffer.setUint8(0, iMotor)
    sendeBuffer.setUint8(1, iServo)
    radio.sendNumber(sendeBuffer.getNumber(NumberFormat.UInt32LE, 0))
    fDisplay()
    basic.turnRgbLedOff()
})
