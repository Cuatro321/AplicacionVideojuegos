import React, { useEffect, useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonButton, IonIcon, IonBadge, IonSearchbar, IonToast
} from '@ionic/react';
import { star, informationCircle, play } from 'ionicons/icons';

const DATA = [
  { id: 1, nombre: 'The Legend of Zelda: TOTK', genero: 'Aventura', calificacion: 5, img: '/Legenda.jpg' },
  { id: 2, nombre: 'Elden Ring', genero: 'RPG', calificacion: 5, img: '/elden.webp' },
  { id: 3, nombre: 'God of War: Ragnarök', genero: 'Acción', calificacion: 4, img: '/good.webp' },
  { id: 4, nombre: 'Hollow Knight', genero: 'Metroidvania', calificacion: 4, img: '/hollow.jpg' },
  { id: 5, nombre: 'Minecraft', genero: 'Sandbox', calificacion: 5, img: '/mine.png' }
];

export default function Juegos() {
  const [busqueda, setBusqueda] = useState('');
  const [lista, setLista] = useState(DATA);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    console.log('Página cargada: Juegos');
  }, []);

  useEffect(() => {
    const filtrados = DATA.filter(j => 
      j.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      j.genero.toLowerCase().includes(busqueda.toLowerCase())
    );
    setLista(filtrados);
  }, [busqueda]);

// Funciones corregidas y funcionales para JavaScript
const handleJugar = (nombre) => {
  setToastMsg(`¡Estás jugando a ${nombre}! 🎮`);
  setShowToast(true);
};

const handleDetalles = (nombre) => {
  setToastMsg(`¡Mostrando detalles de ${nombre}! 🕹️`);
  setShowToast(true);
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>🎮 Catálogo Gamer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSearchbar 
          value={busqueda} 
          onIonInput={e => setBusqueda(e.detail.value ?? '')} 
          placeholder="Buscar juego o género..." 
          debounce={300}
        />

        <IonList className="lista-juegos">
          {lista.map(j => (
            <IonCard key={j.id} className="card-juego">
              {j.img && <img src={j.img} alt={j.nombre} className="card-img"/>}
              <IonCardHeader>
                <IonCardTitle>{j.nombre}</IonCardTitle>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
                  <IonBadge color="tertiary">{j.genero}</IonBadge>
                  {j.calificacion >= 5 && <IonBadge color="danger">Popular</IonBadge>}
                  {j.id === 1 && <IonBadge color="success">Nuevo</IonBadge>}
                </div>
              </IonCardHeader>
              <IonCardContent>
                <div className="calificacion">
                  {Array.from({ length: j.calificacion }).map((_, i) => (
                    <IonIcon key={i} icon={star} />
                  ))}
                </div>
                <p>Sumérgete en este emocionante juego y descubre su mundo único.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <IonButton expand="block" color="success" fill="solid" onClick={() => handleJugar(j.nombre)}>
                    <IonIcon icon={play} slot="start" /> Jugar
                  </IonButton>
                  <IonButton expand="block" color="warning" fill="outline" onClick={() => handleDetalles(j.nombre)}>
                    <IonIcon icon={informationCircle} slot="start" /> Detalles
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        <IonToast
          isOpen={showToast}
          message={toastMsg}
          duration={1500}
          color="primary"
          onDidDismiss={() => setShowToast(false)}
          position="bottom"
        />

        <style>{`
          ion-content {
            --background: linear-gradient(120deg, #0b0c10, #1f2833);
            font-family: 'Press Start 2P', cursive;
            color: #c5c6c7;
          }

          .card-juego {
            margin-bottom: 15px;
            border-radius: 15px;
            overflow: hidden;
            background: linear-gradient(145deg, #1f2833, #2c3e50);
            box-shadow: 0 0 10px #66fcf1, 0 0 20px #45a29e;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .card-juego:hover {
            transform: translateY(-7px) scale(1.03);
            box-shadow: 0 0 25px #66fcf1, 0 0 35px #45a29e;
          }

          .card-img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-bottom: 2px solid #45a29e;
            transition: transform 0.3s;
          }
          .card-img:hover {
            transform: scale(1.05);
          }

          ion-card-title {
            font-size: 1rem;
            font-weight: bold;
            color: #66fcf1;
            text-shadow: 1px 1px 3px #0b0c10;
          }

          ion-badge {
            font-size: 0.7rem;
            color: #0b0c10;
          }

          .calificacion ion-icon {
            color: #ffd700;
            margin-right: 2px;
          }

          ion-button {
            margin-top: 5px;
            --box-shadow: 0 0 5px #66fcf1, 0 0 10px #45a29e;
            font-size: 0.7rem;
          }
          ion-button:hover {
            --box-shadow: 0 0 12px #66fcf1, 0 0 22px #45a29e;
          }

          ion-searchbar {
            --background: #1f2833;
            --color: #c5c6c7;
          }
        `}</style>
      </IonContent>
    </IonPage>
  );
}
