import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonTabs, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';

export default function Inicio() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonTabs>
          <IonTabBar>
            <IonTabButton tab="tab1">
              <IonLabel>Bienvenida</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2">
              <IonLabel>Explora</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
        <p>Descubre los lugares más misteriosos del mundo.</p>
      </IonContent>
    </IonPage>
  );
}
