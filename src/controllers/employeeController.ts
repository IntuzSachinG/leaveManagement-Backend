import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import * as service from "../services/employeeService";
import { EmployeeCreationAttributes } from "../interface/employeeInterface";
import { AuthRequest } from "../types/express.types";
import { Employee } from "../models";
import { AppError } from "../utils/AppError";
// import { AppError } from "../middlewares/errorMiddleware";

// export const createEmployee = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const authReq = req as AuthRequest;
//   try {
//     const data: EmployeeCreationAttributes = authReq.body;
  
//     const employee = await service.createEmployee(data);
//     res.status(201).json(employee);
//   } catch (err) {
//     next(err);
//   }
// };


export const createEmployee = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { name, email, password, role, gender, mobile,departmentId } = req.body;

    // const existing = await User.findOne({ where: { email } });

    // if (existing) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email already exists",
    //   });
    // }

    const existing = await Employee.findOne({
        where: { email },
      });
    
      if (existing) {
        throw new AppError("Email already exists.Please sign in instead", 400);
      }
    

    const hashed = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      name,
      email,
      password: hashed,
      role,
      gender,
      mobile,
      departmentId,
       
    });

    // const token = generateToken({ id: user.id, role: user.role });

    res.status(201).json({

      success: true,
      message: "Employee registered successfully",
      
      // data: [employee]
       data: [{
        name: employee.name,
        email: employee.email,
        role: employee.role,
        gender:employee.gender,
        mobile:employee.mobile,
        departmentId: employee.departmentId
    }],
      // data:{
      //   ...employee,attributes:{exclude:["password"]}
      // }
    });
    // } catch (error: unknown) {
    //   console.error("Register Error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
 // } //   } catch (err) {
//     next(err);
//   }
// };

 } catch (err) {
    next(err);
  }
// } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             res.status(403)
//             res.send({ status: 'error', message: "User already exists"});
//         } else {
//             res.status(500)
//             res.send({ status: 'error', message: "Something went wrong"});
//         }
//     }

};

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;
  try {
    const employees = await service.getEmployees();
    // res.json(employees);
    return res.status(200).json({
      success:true,
      message:"Employees fetched Successfully",
      data:employees,
    })
  } catch (err) {
    next(err);
  }
};
