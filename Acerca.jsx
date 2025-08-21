import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonIcon
} from '@ionic/react';
import { mailOutline, logoInstagram, logoFacebook } from 'ionicons/icons';

export default function Acerca() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ backgroundColor: '#0f0f1e', color: '#00ffcc' }}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ color: '#00ffcc' }}>Acerca de Nosotros</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
        {/* Imagen de portada */}
        <IonCard style={{ boxShadow: '0 0 20px #00ffcc', borderRadius: '12px', marginBottom: '16px' }}>
          <IonImg src="/banner.webp" alt="Imagen de la Empresa" />
        </IonCard>

        {/* Sección de descripción */}
        <IonCard style={{ boxShadow: '0 0 15px #ff00ff', borderRadius: '12px', marginBottom: '16px' }}>
          <IonCardHeader>
            <IonCardTitle style={{ color: '#ff00ff' }}>Nuestra Historia</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ color: '#ccc', fontSize: '0.95rem' }}>
            <p>
              Somos un equipo apasionado de desarrollo y diseño con la misión de crear soluciones
              tecnológicas innovadoras que transformen experiencias.
            </p>
            <p>
              Con más de 5 años de trayectoria en proyectos móviles y web, dominamos Ionic React,
              Laravel, Django y demás tecnologías modernas.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Sección de equipo con cards individuales */}
        <IonCard style={{ boxShadow: '0 0 15px #00ffff', borderRadius: '12px', marginBottom: '16px' }}>
          <IonCardHeader>
            <IonCardTitle style={{ color: '#00ffff' }}>Conoce al Equipo</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {/* Victor Manuel */}
                <IonCol size="12" size-md="4">
                  <IonCard style={{ boxShadow: '0 0 10px #00ff99', borderRadius: '10px' }}>
                    <IonImg src="/victor.webp" alt="Victor Manuel" />
                    <IonCardHeader>
                      <IonCardTitle style={{ color: '#00ff99' }}>Victor Manuel</IonCardTitle>
                      <p style={{ color: '#ccc' }}>Desarrollador Principal</p>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
                {/* Ana López */}
                <IonCol size="12" size-md="4">
                  <IonCard style={{ boxShadow: '0 0 10px #ff00ff', borderRadius: '10px' }}>
                    <IonImg src="/ana.jpg" alt="Ana López" />
                    <IonCardHeader>
                      <IonCardTitle style={{ color: '#ff00ff' }}>Ana López</IonCardTitle>
                      <p style={{ color: '#ccc' }}>Diseñadora UI/UX</p>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
                {/* Carlos Ruiz */}
                <IonCol size="12" size-md="4">
                  <IonCard style={{ boxShadow: '0 0 10px #00ffff', borderRadius: '10px' }}>
                    <IonImg src="/carlos.jpg" alt="Carlos Ruiz" />
                    <IonCardHeader>
                      <IonCardTitle style={{ color: '#00ffff' }}>Carlos Ruiz</IonCardTitle>
                      <p style={{ color: '#ccc' }}>Especialista en Backend</p>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Sección de contacto */}
        <IonCard style={{ boxShadow: '0 0 15px #ffcc00', borderRadius: '12px', marginBottom: '16px' }}>
          <IonCardHeader>
            <IonCardTitle style={{ color: '#ffcc00' }}>Contáctanos</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem
                href="mailto:info@midominio.com"
                style={{
                  color: '#00ff99',
                  background: '#0f0f1e',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px #00ff99'
                }}
              >
                <IonIcon slot="start" icon={mailOutline} />
                <span style={{ color: '#00ff99', fontWeight: 'bold' }}>info@midominio.com</span>
              </IonItem>

              <IonItem
                style={{
                  color: '#ff00ff',
                  background: '#0f0f1e',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px #ff00ff'
                }}
              >
                <IonIcon slot="start" icon={logoInstagram} />
                <span style={{ color: '#ff00ff', fontWeight: 'bold' }}>@midominio</span>
              </IonItem>

              <IonItem
                style={{
                  color: '#00ffff',
                  background: '#0f0f1e',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px #00ffff'
                }}
              >
                <IonIcon slot="start" icon={logoFacebook} />
                <span style={{ color: '#00ffff', fontWeight: 'bold' }}>/midominio</span>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
