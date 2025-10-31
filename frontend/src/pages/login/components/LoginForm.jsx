import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading = false, isDarkMode = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input with Floating Label Animation */}
      <div className="relative">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          placeholder="Enter your email address"
          error={errors?.email}
          required
          disabled={loading}
          className={`w-full transition-all duration-300 ${emailFocused || formData?.email
              ? isDarkMode
                ? 'ring-2 ring-blue-500'
                : 'ring-2 ring-blue-400'
              : ''
            } ${errors?.email
              ? 'ring-2 ring-red-500 border-red-500'
              : ''
            }`}
        />
      </div>

      {/* Password Input with Floating Label Animation */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          placeholder="Enter your password"
          error={errors?.password}
          required
          disabled={loading}
          className={`w-full pr-12 transition-all duration-300 ${passwordFocused || formData?.password
              ? isDarkMode
                ? 'ring-2 ring-blue-500'
                : 'ring-2 ring-blue-400'
              : ''
            } ${errors?.password
              ? 'ring-2 ring-red-500 border-red-500'
              : ''
            }`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`absolute right-3 top-9 rounded p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
              ? 'text-gray-400 hover:text-gray-200'
              : 'text-muted-foreground hover:text-foreground'
            }`}
          disabled={loading}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
              className="sr-only"
            />
            <div className={`w-5 h-5 border-2 rounded transition-all duration-300 ${formData?.rememberMe
                ? isDarkMode
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-blue-600 border-blue-600'
                : isDarkMode
                  ? 'border-gray-600 group-hover:border-gray-500'
                  : 'border-gray-300 group-hover:border-gray-400'
              }`}>
              {formData?.rememberMe && (
                <Icon name="Check" size={14} color="white" className="absolute top-0.5 left-0.5" />
              )}
            </div>
          </div>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
            Remember me
          </span>
        </label>
      </div>

      {/* Submit Button with Enhanced Animation */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        disabled={loading}
        iconName="LogIn"
        iconPosition="left"
        className={`mt-8 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isDarkMode
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500'
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
          } shadow-lg hover:shadow-xl`}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;