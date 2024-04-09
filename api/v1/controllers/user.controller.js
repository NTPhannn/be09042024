const md5=require("md5")
const User=require("../models/user.model")
const generate=require("../../../helpers/generate")
const ForgotPassword=require("../models/forgot-password.model")
const sendMailHelper=require("../../../helpers/sendMail")

module.exports.register=async(req,res)=>{
    const exitsEmail=await User.findOne({
        email: req.body.email
    }
)
    if(exitsEmail){
        res.json({
            code: 400,
            message:" email da ton tai"
        })
        return
    }
    if(!exitsEmail){
        const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(req.body.email)) {
        res.json({
            code: 400,
            message:" email không đúng định dạng"
        })
        return
    } 
    }
    if (!req.body.email || req.body.email.trim() === '') {
        res.json({
            code: 400,
            message: "Email không được để trống"
        });
        return;
    }
    console.log(req.body)
    const inforUser={
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password)
    }
    const user=new User(inforUser)
    await user.save()
    res.json({
        code:200,
        message: " tạo tài khoản thành công ",
    })
}

module.exports.login=async(req,res)=>{
    const email= req.body.email;
    const password=req.body.password;



    const user=await User.findOne({
        email: email
    })

    if (!email) {
        res.json({
            code: 400,
            message: "Vui lòng nhập địa chỉ email."
        });
        return;
    }

    if(!user){
        res.json({
            code: 400,
            message:" sai mật khẩu hoặc email"
        })
        return
    }
    if (!password) {
        res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu."
        });
        return;
    }

    if(md5(password)!=user.password){
        res.json({
            code: 400,
            message: " sai rồi"
        })
        return
    }
    res.json({
        code :200,
        message: "Đăng nhập thành công",
    })
}

module.exports.forgotPassword=async(req,res)=>{
    const email=req.body.email
    const otp=generate.generateRandomString(8)
    const timeExpire=5;
    const objectForgotPassword={
        email: email,
        otp: otp,
        expireAt: Date.now()+timeExpire*60
    }

    const forgotPassword=new ForgotPassword(objectForgotPassword)
    forgotPassword.save()

    const subject=" Mã OTP xác minh lấy lại mật khẩu"

    const html=` Mã OTP  để lấy lại mật khẩu của bạn là <b>${otp}</b>( Sử dụng trong vòng ${timeExpire} phút). Vui lòng không chia sẻ cho bất kì ai`

    sendMailHelper.sendMail(email,subject,html)

    console.log(objectForgotPassword)
    res.json({
        code:200,
        message:" đã gửi mã OTP qua email"
    })
}

module.exports.detail=async(req,res)=>{
    const id=req.params.id

    const user= await User.findOne({
        _id: id,
        
    }).select("-password")

    console.log(id)
    res.json({
        code: 200,
        message: "thành công",
        info: user
    })
}

