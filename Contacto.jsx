import { useState, useEffect } from 'react';
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
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonToast,
  IonLoading,
  IonIcon,
  IonList,
  IonAvatar
} from '@ionic/react';
import { personCircleOutline, mailOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';

// Firebase imports
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [cargandoMensajes, setCargandoMensajes] = useState(true);

  // Cargar mensajes de Firestore al iniciar el componente
  useEffect(() => {
    const fetchMensajes = async () => {
      setCargandoMensajes(true);
      try {
        const mensajesRef = collection(db, 'mensajes');
        const q = query(mensajesRef, orderBy('fecha', 'desc'));
        const querySnapshot = await getDocs(q);

        const listaMensajes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMensajes(listaMensajes);
      } catch (error) {
        console.error('Error cargando mensajes:', error);
      } finally {
        setCargandoMensajes(false);
      }
    };

    fetchMensajes();
  }, []);

  const handleEnviar = async () => {
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      setShowToast(true);
      return;
    }

    setLoading(true);
    try {
      // Guardar en Firestore
      await addDoc(collection(db, 'mensajes'), {
        nombre,
        email,
        mensaje,
        fecha: new Date()
      });

      // Limpiar inputs
      setNombre('');
      setEmail('');
      setMensaje('');

      // Refrescar mensajes después de enviar
      const mensajesRef = collection(db, 'mensajes');
      const q = query(mensajesRef, orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);

      const listaMensajes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setMensajes(listaMensajes);
      alert('Mensaje enviado correctamente');
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al enviar. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="titulo-contacto">
            <IonIcon icon={chatbubbleEllipsesOutline} className="icono-contacto" />
            Contacto
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard className="form-card">
          <IonCardHeader>
            <IonCardTitle style={{ textAlign: 'center' }}>
              <IonIcon icon={mailOutline} style={{ marginRight: '6px' }} />
              Envíanos un Mensaje
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Nombre*</IonLabel>
              <IonInput
                value={nombre}
                placeholder="Tu nombre"
                onIonChange={e => setNombre(e.detail.value || '')}
                clearInput
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Email*</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="correo@ejemplo.com"
                onIonChange={e => setEmail(e.detail.value || '')}
                clearInput
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Mensaje*</IonLabel>
              <IonTextarea
                value={mensaje}
                placeholder="Escribe tu mensaje aquí"
                onIonChange={e => setMensaje(e.detail.value || '')}
                autoGrow
              />
            </IonItem>

            <IonButton
              expand="block"
              className="neon-button ion-margin-top"
              onClick={handleEnviar}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </IonButton>

            <IonLoading
              isOpen={loading}
              message="Enviando mensaje..."
              duration={0}
            />

            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Por favor, completa todos los campos obligatorios"
              duration={2000}
              color="warning"
            />
          </IonCardContent>
        </IonCard>

        {cargandoMensajes ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando mensajes...</p>
        ) : (
          mensajes.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ textAlign: 'center' }}>📬 Mensajes Recibidos</h3>
              <IonList>
                {mensajes.map((m) => (
                  <IonCard key={m.id} className="mensaje-card">
                    <IonItem lines="none">
                      <IonAvatar slot="start">
                        <IonIcon icon={personCircleOutline} style={{ fontSize: '40px' }} />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{m.nombre}</h2>
                        <p style={{ fontSize: '0.9rem', color: 'gray' }}>{m.email}</p>
                      </IonLabel>
                    </IonItem>
                    <IonCardContent>
                      <p style={{ fontStyle: 'italic' }}>{m.mensaje}</p>
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonList>
            </div>
          )
        )}

        <style>{`
          .titulo-contacto {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 700;
            font-size: 1.6rem;
            color: #00f7ff;
            text-shadow:
              0 0 8px #00f7ff,
              0 0 15px #00f7ff,
              0 0 20px #00f7ff;
          }

          .icono-contacto {
            font-size: 1.8rem;
            color: #00f7ff;
            filter:
              drop-shadow(0 0 6px #00f7ff)
              drop-shadow(0 0 10px #00f7ff);
          }

          .form-card {
            border: 2px solid #00f7ff;
            box-shadow: 0 0 10px #00f7ff, 0 0 20px #00f7ff;
            border-radius: 15px;
            animation: pulseBorder 3s infinite;
          }

          .mensaje-card {
            border-left: 5px solid #c66aff;
            transition: transform 0.2s ease;
          }

          .mensaje-card:hover {
            transform: scale(1.02);
          }

          .neon-button {
            --background: transparent;
            --color: #00f7ff;
            border: 2px solid #00f7ff;
            box-shadow:
              0 0 5px #00f7ff,
              0 0 10px #00f7ff,
              0 0 20px #00f7ff;
            transition: all 0.3s ease;
            font-weight: bold;
            font-size: 1.1rem;
          }

          .neon-button:hover {
            background: #00f7ff;
            color: #000;
            box-shadow:
              0 0 8px #00f7ff,
              0 0 16px #00f7ff,
              0 0 32px #00f7ff;
          }

          @keyframes pulseBorder {
            0% { box-shadow: 0 0 10px #00f7ff, 0 0 20px #00f7ff; }
            50% { box-shadow: 0 0 15px #00f7ff, 0 0 30px #00f7ff; }
            100% { box-shadow: 0 0 10px #00f7ff, 0 0 20px #00f7ff; }
          }
        `}</style>
      </IonContent>
    </IonPage>
  );
}
