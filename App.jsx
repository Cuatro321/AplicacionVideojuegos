import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonIcon,
  setupIonicReact
} from '@ionic/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { home, person, settings, mail } from 'ionicons/icons';

/* Core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

/* Páginas */
import Tabs from './pages/Tabs';
import Contacto from './pages/Contacto';
import Perfil from './pages/Perfil';
import Ajustes from './pages/Ajustes';

/* Inicializar Ionic */
setupIonicReact();

export default function App() {
  return (
    <IonApp>
      <IonSplitPane contentId="main-content">
        {/* Menú lateral */}
        <IonMenu contentId="main-content" type="overlay">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle style={{ fontWeight: 'bold', fontSize: '1.6rem', textAlign: 'center' }}>
                GameZone
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem routerLink="/tabs/bienvenida" routerDirection="none" lines="none">
                <IonIcon icon={home} slot="start" />
                <IonLabel>Inicio</IonLabel>
              </IonItem>
              <IonItem routerLink="/perfil" routerDirection="none" lines="none">
                <IonIcon icon={person} slot="start" />
                <IonLabel>Perfil</IonLabel>
              </IonItem>
              <IonItem routerLink="/ajustes" routerDirection="none" lines="none">
                <IonIcon icon={settings} slot="start" />
                <IonLabel>Ajustes</IonLabel>
              </IonItem>
              <IonItem routerLink="/contacto" routerDirection="none" lines="none">
                <IonIcon icon={mail} slot="start" />
                <IonLabel>Contacto</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

        {/* Contenido principal */}
        <IonRouterOutlet id="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/tabs/bienvenida" />} />
            <Route path="/tabs/*" element={<Tabs />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/ajustes" element={<Ajustes />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonApp>
  );
}
