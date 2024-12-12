import ortodoncia from '../assets/ortodoncia.jpg';
import endodoncia from '../assets/endodoncia.png';
import limpiezaDental from '../assets/limpieza-dental.jpg';
import blanqueamientoDental from '../assets/blanqueamiento-dental.jpg';
import implantologiaDental from '../assets/implantologia.jpg';
import cirugiaBucal from '../assets/cirugia-bucal.jpg';
import odontopediatria from '../assets/odontopediatria.jpg';
import protesisDentales from '../assets/protesis-dentales.jpg';
import periodoncia from '../assets/periodoncia.webp';
import esteticaDental from '../assets/estetica-dental.jpg';

const serviceData = [
    {
        name: 'Ortodoncia',
        description: 'Tratamiento para alinear tus dientes y mejorar tu sonrisa.',
        image: ortodoncia,
        link: '/dates',
        originalPrice: '$8,000 MXN',
        discountedPrice: '$6,400 MXN'
    },
    {
        name: 'Endodoncia',
        description: 'Tratamiento de conductos para salvar dientes dañados.',
        image: endodoncia,
        link: '/dates',
        originalPrice: '$3,500 MXN',
        discountedPrice: '$2,800 MXN'
    },
    {
        name: 'Limpieza Dental',
        description: 'Elimina la placa y el sarro con nuestra limpieza dental profesional.',
        image: limpiezaDental,
        link: '/dates',
        originalPrice: '$800 MXN',
        discountedPrice: '$640 MXN'
    },
    {
        name: 'Blanqueamiento Dental',
        description: 'Recupera el blanco natural de tus dientes.',
        image: blanqueamientoDental,
        link: '/dates',
        originalPrice: '$2,000 MXN',
        discountedPrice: '$1,600 MXN'
    },
    {
        name: 'Implantología Dental',
        description: 'Recupera tu sonrisa con nuestros implantes dentales.',
        image: implantologiaDental,
        link: '/dates',
        originalPrice: '$10,000 MXN',
        discountedPrice: '$8,000 MXN'
    },
    {
        name: 'Cirugía Bucal',
        description: 'Procedimientos quirúrgicos para resolver problemas complejos.',
        image: cirugiaBucal,
        link: '/dates',
        originalPrice: '$5,500 MXN',
        discountedPrice: '$4,400 MXN'
    },
    {
        name: 'Odontopediatría',
        description: 'Tratamientos dentales para niños, enfocados en prevención.',
        image: odontopediatria,
        link: '/dates',
        originalPrice: '$800 MXN',
        discountedPrice: '$640 MXN'
    },
    {
        name: 'Prótesis Dentales',
        description: 'Recupera tu funcionalidad y estética dental con prótesis.',
        image: protesisDentales,
        link: '/dates',
        originalPrice: '$5,000 MXN',
        discountedPrice: '$4,000 MXN'
    },
    {
        name: 'Periodoncia',
        description: 'Cuida la salud de tus encías con nuestros tratamientos de periodoncia.',
        image: periodoncia,
        link: '/dates',
        originalPrice: '$3,500 MXN',
        discountedPrice: '$2,800 MXN'
    },
    {
        name: 'Estética Dental',
        description: 'Realza tu sonrisa con carillas dentales.',
        image: esteticaDental,
        link: '/dates',
        originalPrice: '$4,000 MXN',
        discountedPrice: '$3,200 MXN'
    }
];

export default serviceData;