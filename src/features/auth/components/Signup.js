import { useForm } from "react-hook-form"
import { createUserAsync, selectUser } from '../authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const password = watch("password", "")
    return (
        <div style={{ padding: '20px', paddingTop: '50px', paddingBottom: '50px' }} className="col-4 m-auto">
            <h1>Signup</h1>
            <br />
            <form
                onSubmit={handleSubmit(async (data) => {
                    try {
                        const response = await dispatch(createUserAsync(data));
                        if (response.payload.status === 'success') {
                            reset();
                            Swal.fire({
                                title: "Done",
                                text: "User Created Successfully",
                                icon: "success"
                            }).then(result => {
                                if(result.isConfirmed){
                                    navigate('/login')
                                }
                            });
                        }else{
                            if(response.payload.split(' ')[0] === 'E11000'){
                                Swal.fire({
                                    title: "Error",
                                    text: "User already exist",
                                    icon: "error"
                                });
                            }else{
                                Swal.fire({
                                    title: "Error",
                                    text: `${response.payload}`,
                                    icon: "Error"
                                });
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }

                })}

                style={{ padding: '20px', border: '1px solid #cdcdcd', borderRadius: '5px', boxShadow: '1px 1px 10px 5px rgba(0,0,0,0.1)' }}
            >
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        {...register("firstName", { required: "First name is required field" })}
                    />
                    {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="lastName"
                        {...register("lastName", { required: "Last name is required field" })}
                    />
                    {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        {...register("email", {
                            required: "Email is required field", pattern: {
                                value: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
                                message: 'Invalid Email'
                            }
                        })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password", {
                            required: "Password is required field", minLength: {
                                value: 6,
                                message: "Password length is greater than 6"
                            }
                        })}

                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "confirmPassword is required field",
                            validate: val => val === password || 'password is not matched'
                        })}
                    />
                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Signup;