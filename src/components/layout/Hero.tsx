import { Card } from '../ui';

function Hero() {
  return (
    <section className="m-8 flex flex-col items-center justify-center">
      <Card variant="glass">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Bienvenidos a Colombia Hope</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Comparte, debate, y construye comunidad con esperanza.
        </p>
      </Card>
    </section>
  );
}

export default Hero;