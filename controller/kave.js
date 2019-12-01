const Kavenegar = require('kavenegar');


let kaveapi = Kavenegar.KavenegarApi({
    apikey: '764354655574736F55465464567A5032686F7A6262513D3D'
});
kaveapi.Send({
    message: ' کد تایید شما ' + this.token,
    sender: "10000011010011",
    receptor: this.userNumber
})

module.exports = kaveapi;