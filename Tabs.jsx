import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet
} from '@ionic/react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* Páginas */
import Bienvenida from './Bienvenida';
import Acerca from './Acerca';
import Juegos from './Juegos';
import Noticias from './Noticias';
import Consolas from './Consolas'; // Nueva página para consolas

/* Iconos estilo videojuegos */
import { home, informationCircle, gameController, newspaper, laptop } from 'ionicons/icons';

export default function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Routes>
          <Route path="bienvenida" element={<Bienvenida />} />
          <Route path="juegos" element={<Juegos />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="acerca" element={<Acerca />} />
          <Route path="consolas" element={<Consolas />} />
          <Route path="*" element={<Navigate to="/tabs/bienvenida" />} />
        </Routes>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="tab-bar-videojuego">
        <IonTabButton tab="bienvenida" href="/tabs/bienvenida">
          <IonIcon icon={home} className="icon-videojuego" />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>

        <IonTabButton tab="juegos" href="/tabs/juegos">
          <IonIcon icon={gameController} className="icon-videojuego" />
          <IonLabel>Juegos</IonLabel>
        </IonTabButton>

        <IonTabButton tab="consolas" href="/tabs/consolas">
          <IonIcon icon={laptop} className="icon-videojuego" />
          <IonLabel>Consolas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="noticias" href="/tabs/noticias">
          <IonIcon icon={newspaper} className="icon-videojuego" />
          <IonLabel>Noticias</IonLabel>
        </IonTabButton>

        <IonTabButton tab="acerca" href="/tabs/acerca">
          <IonIcon icon={informationCircle} className="icon-videojuego" />
          <IonLabel>Acerca</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <style>{`
        ion-tabs { 
          --background:#121212; 
          font-family:'Press Start 2P',cursive; 
        }
        .tab-bar-videojuego { 
          --background:#1c1c1c; 
          --color:#aaa; 
          --color-selected:#66ffcc; 
          border-top:2px solid #66ffcc; 
          height:60px; 
        }
        ion-tab-button { 
          --color:#aaa; 
          --color-selected:#66ffcc; 
          display:flex; 
          flex-direction:column; 
          justify-content:center; 
          align-items:center; 
          font-size:11px; 
        }
        .icon-videojuego { 
          font-size:22px; 
          color:#66ffcc; 
          transition: transform 0.2s,color 0.2s; 
        }
        ion-tab-button.ion-selected .icon-videojuego { 
          color:#a0ffc4; 
          transform:scale(1.1); 
        }
        ion-label { 
          font-size:9px; 
          letter-spacing:0.5px; 
          text-transform:uppercase; 
        }
      `}</style>
    </IonTabs>
  );
}
