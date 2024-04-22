import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

function Login(){
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    return(
        <div style={{ padding: '20px', paddingTop: '100px' }} className="col-4 m-auto">
            <h1>Login</h1>
            <br />
            <form
                onSubmit={handleSubmit(async (data) => {
                    try{
                        const response = await axios.post('http://localhost:8000/api/v1/users/login', data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        // console.log(response.data)
                        if(response.data.status === 'success'){
                            localStorage.setItem('authToken', `Bearer ${response.data.data}`);
                            navigate('/')
                        }
                    }catch(error){
                        Swal.fire(error.response.data.error);
                    }
                })}
            style={{ padding: '20px', border: '1px solid #cdcdcd', borderRadius: '5px', boxShadow: '1px 1px 10px 5px rgba(0,0,0,0.1)' }}
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        required
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
                        required
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
                
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login;