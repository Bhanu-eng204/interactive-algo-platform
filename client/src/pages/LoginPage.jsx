// LoginPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const url = isRegister
            ? 'http://localhost:5000/api/auth/register'
            : 'http://localhost:5000/api/auth/login';

        const payload = isRegister
            ? form
            : { email: form.email, password: form.password };

        try {
            const res = await axios.post(url, payload);
            if (!isRegister) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                navigate('/problem');
            } else {
                setIsRegister(false);
                alert("Registration successful. Please login.");
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Request failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>{isRegister ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {isRegister && (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleInputChange}
                            required
                            className="login-input"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleInputChange}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </form>
                <div className="login-toggle">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="login-link-button"
                    >
                        {isRegister ? '← Back to Login' : 'Register here'}
                    </button>
                </div>
                {error && <p className="login-error">{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;
