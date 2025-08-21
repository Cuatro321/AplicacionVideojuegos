import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonContent, IonImg, IonFab, IonFabButton, IonIcon, IonFabList,
  IonButton, IonToast
} from '@ionic/react';
import {
  add, gameControllerOutline, hardwareChipOutline,
  newspaperOutline, informationCircleOutline
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';

export default function Bienvenida() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const navigate = useNavigate();

  const showMessage = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="toolbar-gamer">
          <IonButtons slot="start">
            <IonMenuButton color="light" />
          </IonButtons>
          <IonTitle className="titulo-gamer">
            <IonIcon icon={gameControllerOutline} className="icono-gamer" />
            <span className="texto-neon">GameZone</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ position: 'relative' }}>
        <IonImg
          src="/fondo1.jpg"
          alt="Bienvenida Videojuegos"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: -1
          }}
        />
        <div className="overlay-gamer" />

        <div className="caja-bienvenida">
          <h1 className="titulo-principal">🎮 ¡Bienvenido a GameZone!</h1>
          <p className="texto-descriptivo">
            Explora consolas, revive juegos retro y conoce lo último en cultura gamer.
          </p>

          <div className="botones-bienvenida">
            <IonButton expand="block" className="btn-gamer azul" onClick={() => navigate('/tabs/juegos')}>
              Juegos Populares
            </IonButton>
            <IonButton expand="block" className="btn-gamer morado" onClick={() => navigate('/tabs/consolas')}>
              Consolas
            </IonButton>
            <IonButton expand="block" className="btn-gamer notificacion" onClick={() => navigate('/tabs/noticias')}>
              Noticias Gamer
            </IonButton>
          </div>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton className="fab-principal"><IonIcon icon={add} /></IonFabButton>
          <IonFabList side="start">
            <IonFabButton onClick={() => showMessage('Explora Juegos')} routerLink="/tabs/juegos">
              <IonIcon icon={gameControllerOutline} />
            </IonFabButton>
            <IonFabButton onClick={() => showMessage('Descubre Consolas')} routerLink="/tabs/consolas">
              <IonIcon icon={hardwareChipOutline} />
            </IonFabButton>
            <IonFabButton onClick={() => showMessage('Noticias Gamer')} routerLink="/tabs/noticias">
              <IonIcon icon={newspaperOutline} />
            </IonFabButton>
            <IonFabButton onClick={() => showMessage('Próximamente')}>
              <IonIcon icon={informationCircleOutline} />
            </IonFabButton>
          </IonFabList>
        </IonFab>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={2000}
          position="bottom"
          color="dark"
        />

      </IonContent>

      {/* Estilos */}
      <style>{`
        /* Toolbar */
        .toolbar-gamer {
          background: linear-gradient(90deg,#0f0c29,#302b63,#24243e);
          color:#fff;
        }
        .titulo-gamer {
          display:flex; align-items:center; font-family:'Orbitron',sans-serif;
        }
        .icono-gamer {
          font-size:1.6rem; margin-right:8px; color:#00f7ff;
          animation:resplandor 2s ease-in-out infinite alternate;
        }
        .texto-neon {
          color:#00f7ff;
          text-shadow:0 0 4px #00f7ff,0 0 10px #00f7ff;
          font-weight:bold;
        }

        /* Overlay */
        .overlay-gamer {
          position:absolute; inset:0;
          background:rgba(0,0,0,.65);
          z-index:0;
        }

        /* Caja Bienvenida */
        .caja-bienvenida {
          position:relative; z-index:1; text-align:center; color:#fff;
          padding:2rem 1rem; max-width:600px; margin:10vh auto 0;
          border-radius:15px; background:rgba(20,20,20,.75);
          animation:fadeInUp 1.2s ease forwards; opacity:0;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .titulo-principal {
          font-size:2rem; margin-bottom:.5rem; font-weight:bold;
          text-shadow:0 0 8px #0ff,0 0 16px #0ff;
        }
        .texto-descriptivo {
          font-size:1rem; margin-bottom:1.5rem; text-shadow:0 0 6px #000;
        }

        /* Botones */
        .botones-bienvenida {
          display:flex; flex-direction:column; gap:12px;
          padding: 0 10px;
        }
        .btn-gamer {
          --border-radius:12px; font-weight:bold;
          font-family:'Orbitron',sans-serif; color:#fff;
          text-transform:uppercase; font-size:.95rem;
          transition: transform .2s, box-shadow .2s;
        }
        .btn-gamer:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
        .btn-gamer.azul { background:linear-gradient(45deg,#007cf0,#00dfd8); }
        .btn-gamer.morado { background:linear-gradient(45deg,#7928ca,#ff0080); }
        .btn-gamer.notificacion { 
          background: linear-gradient(45deg,#ff3d00,#ff9800);
          color:#fff; font-weight:bold;
          box-shadow: 0 0 15px #ff3d00, 0 0 30px #ff9800;
          animation: parpadeo 1.5s infinite alternate;
        }

        /* FAB */
        .fab-principal {
          --background: linear-gradient(45deg,#ff0080,#7928ca);
          color:#fff;
        }

        /* Animaciones */
        @keyframes fadeInUp {
          0% {opacity:0; transform:translateY(40px);}
          100% {opacity:1; transform:translateY(0);}
        }
        @keyframes resplandor {
          from {filter:drop-shadow(0 0 4px #00f7ff);}
          to {filter:drop-shadow(0 0 12px #00f7ff);}
        }
        @keyframes parpadeo {
          0% {box-shadow: 0 0 15px #ff3d00, 0 0 30px #ff9800;}
          100% {box-shadow: 0 0 25px #ff5722, 0 0 50px #ffb74d;}
        }

        /* Responsivo */
        @media (max-width:480px) {
          .caja-bienvenida { margin-top:8vh; padding:1.5rem 1rem; }
          .titulo-principal { font-size:1.7rem; }
          .texto-descriptivo { font-size:.95rem; }
          .btn-gamer { font-size:.85rem; }
        }
      `}</style>
    </IonPage>
  );
}
