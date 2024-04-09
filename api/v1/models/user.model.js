const mongoose=require("mongoose")


const userSchema=new mongoose.Schema(
    {
        fullName: String,
        email: String,
        studenId: String,
        password: String,
        dob: Date,
        exams: [
            {
                idExam: String, 
                timeCompleted: Date,
                result: Number
    }
    ]
    }
)

const User=mongoose.model("User",userSchema,"users")

module.exports=User