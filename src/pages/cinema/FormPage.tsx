import { useState, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  bio: string;
  notifications: boolean;
  newsletter: boolean;
  terms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  birthDate?: string;
  bio?: string;
  terms?: string;
}

const FormPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    birthDate: '',
    bio: '',
    notifications: false,
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validaciones simplificadas
  const validateField = (name: string, value: string | boolean): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Nombre requerido';
        }
        break;

      case 'email':
        if (!value) {
          return 'Email requerido';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value === 'string' && !emailRegex.test(value)) {
          return 'Email inválido';
        }
        break;

      case 'password':
        if (!value) {
          return 'Contraseña requerida';
        }
        if (typeof value === 'string' && value.length < 6) {
          return 'Mínimo 6 caracteres';
        }
        break;

      case 'birthDate':
        if (!value) {
          return 'Fecha requerida';
        }
        break;

      case 'bio':
        if (typeof value === 'string' && value.length > 500) {
          return 'Máximo 500 caracteres';
        }
        break;

      case 'terms':
        if (!value) {
          return 'Debes aceptar los términos';
        }
        break;

      default:
        return undefined;
    }
    return undefined;
  };

  // Actualizar errores cuando cambian los datos del formulario
  useEffect(() => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      if (touched[key]) {
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
        }
      }
    });
    setErrors(newErrors);
  }, [formData, touched]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validar todos los campos
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);

    // Si no hay errores, simular envío
    if (Object.keys(newErrors).length === 0) {
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      // Resetear formulario
      setFormData({
        name: '',
        email: '',
        password: '',
        birthDate: '',
        bio: '',
        notifications: false,
        newsletter: false,
        terms: false
      });
      setTouched({});
    }

    setIsSubmitting(false);
  };



  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Header minimalista */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-light text-base-content mb-3">
            Registro
          </h1>
          <p className="text-sm text-base-content/60">
            Únete a Cinema App
          </p>
        </div>

        {/* Mensaje de éxito */}
        {submitSuccess && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-8 text-center">
            <span className="text-success text-sm">¡Registro exitoso!</span>
          </div>
        )}

        {/* Formulario minimalista */}
         <form onSubmit={handleSubmit} className="space-y-8">
           {/* Campo Nombre */}
           <div>
             <input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleInputChange}
               onBlur={handleBlur}
               className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 ${
                 errors.name ? 'border-error' : 'border-base-300 focus:border-primary'
               } focus:outline-none focus:ring-0 text-base placeholder-base-content/40`}
               placeholder="Nombre completo"
             />
             {errors.name && (
               <p className="text-error text-xs mt-2">{errors.name}</p>
             )}
           </div>

           {/* Campo Email */}
           <div>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleInputChange}
               onBlur={handleBlur}
               className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 ${
                 errors.email ? 'border-error' : 'border-base-300 focus:border-primary'
               } focus:outline-none focus:ring-0 text-base placeholder-base-content/40`}
               placeholder="Correo electrónico"
             />
             {errors.email && (
               <p className="text-error text-xs mt-2">{errors.email}</p>
             )}
           </div>

           {/* Campo Contraseña */}
           <div>
             <input
               type="password"
               name="password"
               value={formData.password}
               onChange={handleInputChange}
               onBlur={handleBlur}
               className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 ${
                 errors.password ? 'border-error' : 'border-base-300 focus:border-primary'
               } focus:outline-none focus:ring-0 text-base placeholder-base-content/40`}
               placeholder="Contraseña"
             />
             {errors.password && (
               <p className="text-error text-xs mt-2">{errors.password}</p>
             )}
           </div>

           {/* Campo Fecha de Nacimiento */}
           <div>
             <input
               type="date"
               name="birthDate"
               value={formData.birthDate}
               onChange={handleInputChange}
               onBlur={handleBlur}
               className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 ${
                 errors.birthDate ? 'border-error' : 'border-base-300 focus:border-primary'
               } focus:outline-none focus:ring-0 text-base placeholder-base-content/40`}
             />
             {errors.birthDate && (
               <p className="text-error text-xs mt-2">{errors.birthDate}</p>
             )}
           </div>

           {/* Campo Biografía */}
           <div>
             <textarea
               name="bio"
               value={formData.bio}
               onChange={handleInputChange}
               onBlur={handleBlur}
               rows={4}
               className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 ${
                 errors.bio ? 'border-error' : 'border-base-300 focus:border-primary'
               } focus:outline-none focus:ring-0 text-base placeholder-base-content/40 resize-none`}
               placeholder="Cuéntanos sobre ti (opcional)"
             />
             {errors.bio && (
               <p className="text-error text-xs mt-2">{errors.bio}</p>
             )}
             <p className="text-xs text-base-content/40 mt-1">{formData.bio.length}/500</p>
           </div>

           {/* Checkboxes de Preferencias */}
           <div className="space-y-4 pt-4">
             <div className="flex items-center space-x-3">
               <input
                 type="checkbox"
                 name="notifications"
                 checked={formData.notifications}
                 onChange={handleInputChange}
                 className="w-4 h-4 text-primary bg-transparent border-2 border-base-300 rounded focus:ring-primary focus:ring-2"
               />
               <label className="text-sm text-base-content/80">
                 Recibir notificaciones por email
               </label>
             </div>

             <div className="flex items-center space-x-3">
               <input
                 type="checkbox"
                 name="newsletter"
                 checked={formData.newsletter}
                 onChange={handleInputChange}
                 className="w-4 h-4 text-primary bg-transparent border-2 border-base-300 rounded focus:ring-primary focus:ring-2"
               />
               <label className="text-sm text-base-content/80">
                 Suscribirse al boletín de noticias
               </label>
             </div>

             <div className="flex items-center space-x-3">
               <input
                 type="checkbox"
                 name="terms"
                 checked={formData.terms}
                 onChange={handleInputChange}
                 onBlur={handleBlur}
                 className={`w-4 h-4 text-primary bg-transparent border-2 ${
                   errors.terms ? 'border-error' : 'border-base-300'
                 } rounded focus:ring-primary focus:ring-2`}
               />
               <label className="text-sm text-base-content/80">
                 Acepto los términos y condiciones *
               </label>
             </div>
             {errors.terms && (
               <p className="text-error text-xs mt-1">{errors.terms}</p>
             )}
           </div>

           {/* Botón de envío minimalista */}
           <div className="pt-6">
             <button
               type="submit"
               disabled={isSubmitting}
               className="w-full py-4 bg-primary text-primary-content rounded-lg font-medium transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
             </button>
           </div>
         </form>
      </div>
    </div>
  );
};

export default FormPage;