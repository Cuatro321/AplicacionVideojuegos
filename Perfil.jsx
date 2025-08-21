import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonImg, IonButton, IonIcon, IonLabel, IonInput, IonToast } from '@ionic/react';
import { camera, trash, save } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const LS_KEY = 'gamezone_perfil';

export default function Perfil() {
  const [datos, setDatos] = useState({ nombre: '', juegoFav: '', bio: '', foto: '' });
  const [showToast, setShowToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState('');

  useEffect(() => {
    const data = localStorage.getItem(LS_KEY);
    if (data) setDatos(JSON.parse(data));
  }, []);

  const guardarPerfil = () => {
    localStorage.setItem(LS_KEY, JSON.stringify(datos));
    setMensajeToast('Perfil guardado!');
    setShowToast(true);
  };

  const tomarFoto = async () => {
    try {
      const foto = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });

      if (foto.dataUrl) {
        const nuevoDatos = { ...datos, foto: foto.dataUrl };
        setDatos(nuevoDatos);
        localStorage.setItem(LS_KEY, JSON.stringify(nuevoDatos));
        setMensajeToast('Foto guardada correctamente!');
        setShowToast(true);
      }
    } catch (error) {
      console.log('Error al tomar la foto:', error);
      setMensajeToast('No se pudo tomar la foto.');
      setShowToast(true);
    }
  };

  const eliminarFoto = () => {
    const nuevoDatos = { ...datos, foto: '' };
    setDatos(nuevoDatos);
    localStorage.setItem(LS_KEY, JSON.stringify(nuevoDatos));
    setMensajeToast('Foto eliminada.');
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard style={{ borderRadius: '20px', boxShadow: '0 0 25px #00ffcc' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            {datos.foto ? (
              <IonImg
                src={datos.foto}
                alt="Foto de perfil"
                style={{ width: '150px', height: '150px', borderRadius: '50%', border: '3px solid #00ffcc', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '3px dashed #00ffcc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ffcc', fontWeight: 'bold' }}>
                Sin foto
              </div>
            )}
          </div>

          <IonCardContent style={{ marginTop: '15px' }}>
            <IonLabel position="stacked" color="primary">Nombre:</IonLabel>
            <IonInput
              value={datos.nombre}
              placeholder="Tu nombre"
              onIonChange={(e) => setDatos({ ...datos, nombre: e.detail.value })}
              style={{ marginBottom: '10px' }}
            />

            <IonLabel position="stacked" color="primary">Juego Favorito:</IonLabel>
            <IonInput
              value={datos.juegoFav}
              placeholder="Ej: Zelda"
              onIonChange={(e) => setDatos({ ...datos, juegoFav: e.detail.value })}
              style={{ marginBottom: '10px' }}
            />

            <IonLabel position="stacked" color="primary">Bio:</IonLabel>
            <IonInput
              value={datos.bio}
              placeholder="Escribe algo sobre ti..."
              onIonChange={(e) => setDatos({ ...datos, bio: e.detail.value })}
              style={{ marginBottom: '15px' }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <IonButton expand="full" color="primary" onClick={tomarFoto}>
                <IonIcon icon={camera} slot="start" />
                {datos.foto ? 'Cambiar Foto' : 'Agregar Foto'}
              </IonButton>

              {datos.foto && (
                <IonButton expand="full" color="danger" onClick={eliminarFoto}>
                  <IonIcon icon={trash} slot="start" />
                  Eliminar Foto
                </IonButton>
              )}

              <IonButton expand="full" color="success" onClick={guardarPerfil}>
                <IonIcon icon={save} slot="start" />
                Guardar Perfil
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={showToast}
          message={mensajeToast}
          duration={2000}
          color="dark"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
}
