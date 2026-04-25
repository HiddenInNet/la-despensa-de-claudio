export const mailHTML = (
  name: string,
  email: string,
  subject: string,
  message: string,
) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #fafaf9; padding: 40px 20px; color: #1c1917;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e7e5e4; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        
        <div style="background-color: #14532d; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">La Despensa de Claudio</h1>
          <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 14px; font-weight: 300;">Nuevo aviso desde la web</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="font-size: 20px; color: #14532d; margin-top: 0; font-family: 'Georgia', serif; border-bottom: 1px solid #e7e5e4; padding-bottom: 15px;">Detalles del Contacto</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f5f5f4; width: 120px;">
                <strong style="color: #57534e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Cliente:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f5f5f4; font-size: 15px;">
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f5f5f4;">
                <strong style="color: #57534e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f5f5f4; font-size: 15px;">
                <a href="mailto:${email}" style="color: #14532d; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f5f5f4;">
                <strong style="color: #57534e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Asunto:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f5f5f4; font-size: 15px;">
                ${subject}
              </td>
            </tr>
          </table>

          <div style="background-color: #fafaf9; padding: 20px; border-left: 4px solid #14532d; border-radius: 2px;">
            <strong style="color: #57534e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 10px;">Mensaje del cliente:</strong>
            <p style="margin: 0; line-height: 1.6; font-size: 15px; color: #44403c; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 35px;">
             <a href="mailto:${email}" style="background-color: #14532d; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 13px; font-weight: bold; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
                Responder al cliente
             </a>
          </div>
        </div>
        
        <div style="background-color: #f5f5f4; padding: 20px; text-align: center; font-size: 12px; color: #a8a29e;">
          Este mensaje ha sido enviado de forma automática desde el formulario de contacto de tu página web.
        </div>
        
      </div>
    </div>
  `;
};
