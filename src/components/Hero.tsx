import colombiaHopeBackground from '../assets/images/colombia-hope-background.svg';

function Hero() {
  return (
    <section 
      className="relative min-h-[600px] m-8 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${colombiaHopeBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Glass overlay for text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 glass rounded-xl p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Bienvenidos a Colombia Hope</h1>
        <p className="text-lg text-gray-700 mb-6">
          Comparte, debate, y construye comunidad con esperanza.
        </p>
      </div>
    </section>
  );
}

export default Hero;