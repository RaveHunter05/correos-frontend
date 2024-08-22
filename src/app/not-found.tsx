import Link from 'next/link';

export default function NotFound() {
    return (
        <div>
            <h2>Página no encontrada</h2>
            <p>No se pudo completar la búsqueda</p>
            <Link href="/">Regresar home</Link>
        </div>
    );
}
