import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonToast, IonImg } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const LS_KEY = 'gamezone_perfil';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [juegoFav, setJuegoFav] = useState('');
  const [bio, setBio] = useState('');
  const [foto, setFoto] = useState('');
  const [toast, setToast] = useState(false);

  useEffect(() => {
    console.log('Página cargada: Registro');
    const data = localStorage.getItem(LS_KEY);
    if (data) {
      const obj = JSON.parse(data);
      setNombre(obj.nombre || '');
      setJuegoFav(obj.juegoFav || '');
      setBio(obj.bio || '');
      setFoto(obj.foto || '');
    }
  }, []);

  const guardar = () => {
    const payload = { nombre, juegoFav, bio, foto };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
    setToast(true);
  };

  const tomarFoto = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        quality: 70
      });
      setFoto(image.dataUrl || '');
    } catch (e) {
      console.warn('Cámara cancelada o no disponible', e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Registro Gamer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={nombre} onIonInput={e => setNombre(e.detail.value ?? '')} placeholder="Tu nombre gamer" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Juego Favorito</IonLabel>
            <IonInput value={juegoFav} onIonInput={e => setJuegoFav(e.detail.value ?? '')} placeholder="Ej. Hollow Knight" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Bio</IonLabel>
            <IonTextarea value={bio} onIonInput={e => setBio(e.detail.value ?? '')} placeholder="Cuéntanos algo…" autoGrow />
          </IonItem>
        </IonList>

        <div className="ion-padding">
          {foto && <IonImg src={foto} alt="Foto de perfil" />}
          <IonButton expand="block" onClick={tomarFoto}>Tomar / Elegir Foto</IonButton>
          <IonButton expand="block" color="success" onClick={guardar}>Guardar</IonButton>
        </div>

        <IonToast isOpen={toast} onDidDismiss={() => setToast(false)} message="Datos guardados" duration={1800} />
      </IonContent>
    </IonPage>
  );
}
