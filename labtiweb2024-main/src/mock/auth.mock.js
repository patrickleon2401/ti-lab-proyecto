// Mock data for authentication - simulates exact backend response
export const authMock = {
  // Mock login function
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user database
    const users = [
      {
        id: 1,
        email: "admin@labs.com",
        password: "admin123",
        rol: "admin",
        nombre: "Administrador LABS"
      },
      {
        id: 2,
        email: "user@labs.com", 
        password: "user123",
        rol: "user",
        nombre: "Usuario LABS"
      }
    ];
    
    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      return {
        success: false,
        error: "Credenciales incorrectas"
      };
    }
    
    // Return user data (without password)
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        rol: user.rol,
        nombre: user.nombre
      }
    };
  }
};