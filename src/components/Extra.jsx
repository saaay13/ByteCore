import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Extra = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Función para alternar la visibilidad de las secciones
  const toggleSection = (index) => {
    if (activeSection === index) {
      setActiveSection(null); // Colapsar la sección si está abierta
    } else {
      setActiveSection(index); // Abrir la nueva sección
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Contenido Principal */}
      <div className="p-10 space-y-12">
        <h1 className="text-4xl font-extrabold text-center text-[#22c55e] mb-10">Información Adicional</h1>

        <div className="space-y-12">
          {/* Términos y Condiciones */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl">
            <button
              onClick={() => toggleSection(0)}
              className="w-full text-left text-xl font-bold text-[#22c55e] p-6"
            >
              Términos y Condiciones
            </button>
            {activeSection === 0 && (
              <div className="p-6 text-lg leading-relaxed">
                <p>Bienvenido a ByteCore. Al utilizar nuestros servicios, aceptas los términos establecidos en esta página. Asegúrate de revisar los cambios de manera periódica para estar al tanto de cualquier actualización. Los términos de este contrato son aplicables a todos los usuarios y clientes de nuestros servicios. Cualquier uso no autorizado de nuestros servicios será considerado una violación de estos términos, lo que puede resultar en la suspensión o cancelación de tu cuenta.</p>
                <p>En ByteCore, nos comprometemos a ofrecer servicios de calidad y a mantener la transparencia con nuestros usuarios. Nos reservamos el derecho de modificar los términos y condiciones de nuestro servicio en cualquier momento sin previo aviso. Es responsabilidad del usuario revisar periódicamente los términos para estar al tanto de los cambios.</p>
                <ul className="list-disc pl-6 mt-6">
                  <li><strong>Responsabilidad del Usuario:</strong> Eres responsable de mantener la confidencialidad de tu cuenta. No compartirás tus credenciales con terceros y te comprometes a utilizar el sitio de manera ética y legal.</li>
                  <li><strong>Productos y Precios:</strong> Nos reservamos el derecho de modificar los precios de nuestros productos sin previo aviso. Los precios pueden variar según la demanda y la disponibilidad del mercado.</li>
                  <li><strong>Prohibiciones:</strong> Está prohibido utilizar el sitio para actividades ilegales, incluyendo pero no limitándose a fraudes, actividades de piratería, y distribución de contenido ilícito.</li>
                </ul>
                <p>De acuerdo con nuestra política de privacidad, la información personal recopilada será manejada de acuerdo a la legislación vigente. Al utilizar nuestros servicios, aceptas que ByteCore no se hace responsable de pérdidas o daños derivados de la falta de cumplimiento de estos términos.</p>
              </div>
            )}
          </div>

          {/* Política de Privacidad */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl">
            <button
              onClick={() => toggleSection(1)}
              className="w-full text-left text-xl font-bold text-[#22c55e] p-6"
            >
              Política de Privacidad
            </button>
            {activeSection === 1 && (
              <div className="p-6 text-lg leading-relaxed">
                <p>En ByteCore nos comprometemos a proteger tu privacidad y a manejar tu información personal con el más alto nivel de seguridad. Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestros servicios.</p>
                <p>Recopilamos diversos tipos de información para proporcionarte una experiencia personalizada y mejorar nuestros servicios. La información recopilada incluye, pero no se limita a, tu nombre, dirección de correo electrónico, información de pago, historial de compras y datos de navegación en nuestro sitio web.</p>
                <ul className="list-disc pl-6 mt-6">
                  <li><strong>Recopilación de Información:</strong> Recopilamos datos cuando creas una cuenta, realizas una compra o interactúas con nuestro sitio. Estos datos son necesarios para procesar pedidos, ofrecerte soporte y personalizar tu experiencia.</li>
                  <li><strong>Uso de la Información:</strong> Utilizamos los datos recopilados para procesar tus pedidos, mejorar la calidad de nuestros productos, enviarte promociones personalizadas y mantenerte informado sobre ofertas y cambios en los servicios.</li>
                  <li><strong>Seguridad:</strong> Implementamos medidas de seguridad físicas, electrónicas y administrativas para proteger tu información personal. Sin embargo, debes tener en cuenta que no podemos garantizar una seguridad absoluta, ya que ninguna transmisión de datos por Internet es completamente segura.</li>
                </ul>
                <p>Al usar nuestros servicios, aceptas que procesemos tu información de acuerdo con esta política. Si no estás de acuerdo con nuestra política de privacidad, te recomendamos no utilizar nuestros servicios.</p>
              </div>
            )}
          </div>

          {/* Información de Devolución */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl">
            <button
              onClick={() => toggleSection(2)}
              className="w-full text-left text-xl font-bold text-[#22c55e] p-6"
            >
              Información de Devolución
            </button>
            {activeSection === 2 && (
              <div className="p-6 text-lg leading-relaxed">
                <p>En ByteCore, nuestra misión es asegurarnos de que estés completamente satisfecho con tus compras. Si por alguna razón no estás satisfecho con los productos que has adquirido, puedes devolverlos siguiendo nuestra política de devoluciones.</p>
                <p>Las devoluciones son aceptadas dentro de un plazo de 30 días desde la fecha de compra, siempre y cuando el producto esté en su estado original, sin usar y con el embalaje intacto. La política de devoluciones puede variar dependiendo de la categoría del producto y la región en la que te encuentres.</p>
                <ul className="list-disc pl-6 mt-6">
                  <li><strong>Proceso de Devolución:</strong> Para realizar una devolución, por favor contacta a nuestro soporte. Te proporcionaremos un número de autorización de devolución y las instrucciones necesarias para el envío de vuelta del producto.</li>
                  <li><strong>Excepciones:</strong> Algunos productos como software, productos personalizados y artículos de higiene no son elegibles para devolución debido a su naturaleza.</li>
                  <li><strong>Reembolsos:</strong> Los reembolsos serán procesados de acuerdo con el método de pago original utilizado. El tiempo de procesamiento puede variar dependiendo de la institución financiera que procesó el pago.</li>
                </ul>
                <p>Recuerda que los gastos de envío no son reembolsables, y que los productos deben ser devueltos en condiciones nuevas, sin daños ni signos de uso.</p>
              </div>
            )}
          </div>

          {/* Información de Soporte */}
          <div className="bg-gray-800 rounded-3xl shadow-2xl">
            <button
              onClick={() => toggleSection(3)}
              className="w-full text-left text-xl font-bold text-[#22c55e] p-6"
            >
              Información de Soporte
            </button>
            {activeSection === 3 && (
              <div className="p-6 text-lg leading-relaxed">
                <p>Estamos aquí para ayudarte en cualquier momento. Si tienes dudas, problemas o preguntas sobre tu compra, nuestros canales de soporte están disponibles para brindarte asistencia rápida y eficaz.</p>
                <p>Nuestro equipo de soporte está capacitado para ayudarte con todos los aspectos relacionados con nuestros productos y servicios, desde problemas técnicos hasta consultas generales.</p>
                <ul className="list-disc pl-6 mt-6">
                  <li><strong>Soporte por Correo:</strong> Envíanos un correo a soporte@bytecore.com para obtener asistencia personalizada.</li>
                  <li><strong>Soporte Telefónico:</strong> Llámanos al número +123456789 para hablar directamente con uno de nuestros representantes.</li>
                  <li><strong>Soporte en Línea:</strong> Si prefieres atención instantánea, puedes utilizar nuestro chat en vivo disponible en nuestro sitio web.</li>
                </ul>
                <p>Para consultas más complejas, también ofrecemos soporte técnico avanzado, que puede implicar comunicaciones por correo electrónico o video llamada.</p>
              </div>
            )}
          </div>
        </div>

        {/* Enlace al inicio */}
        <div className="mt-12 text-center">
          <Link to="/" className="text-[#22c55e] text-lg hover:underline transition-all duration-300">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default Extra;
