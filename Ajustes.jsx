import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption, IonButton } from '@ionic/react';

export default function Ajustes() {
  // Estado para modo oscuro
  const [darkMode, setDarkMode] = useState(false);
  // Estado para idioma
  const [idioma, setIdioma] = useState('es');

  // Efecto para cargar preferencias desde localStorage
  useEffect(() => {
    const modoGuardado = localStorage.getItem('modoOscuro') === 'true';
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    setDarkMode(modoGuardado);
    setIdioma(idiomaGuardado);
    aplicarModoOscuro(modoGuardado);
  }, []);

  // Función para activar/desactivar modo oscuro
  const aplicarModoOscuro = (activo) => {
    const root = document.documentElement;
    if (activo) {
      root.style.setProperty('--ion-background-color', '#0b0b0b');
      root.style.setProperty('--ion-text-color', '#00ffcc');
    } else {
      root.style.setProperty('--ion-background-color', '#fff');
      root.style.setProperty('--ion-text-color', '#000');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('modoOscuro', String(!darkMode));
    aplicarModoOscuro(!darkMode);
  };

  const cambiarIdioma = (valor) => {
    setIdioma(valor);
    localStorage.setItem('idioma', valor);
  };

  // Traducciones simples
  const textos = {
    es: { titulo: 'Ajustes', modoOscuro: 'Modo Oscuro', idioma: 'Idioma', guardar: 'Guardar Configuración' },
    en: { titulo: 'Settings', modoOscuro: 'Dark Mode', idioma: 'Language', guardar: 'Save Settings' }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={darkMode ? 'dark' : 'primary'}>
          <IonTitle>{textos[idioma].titulo}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{textos[idioma].modoOscuro}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>{darkMode ? 'Activado' : 'Desactivado'}</IonLabel>
              <IonToggle checked={darkMode} onIonChange={toggleDarkMode} />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{textos[idioma].idioma}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonSelect value={idioma} placeholder="Selecciona idioma" onIonChange={e => cambiarIdioma(e.detail.value)}>
                <IonSelectOption value="es">Español</IonSelectOption>
                <IonSelectOption value="en">English</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonButton expand="full" color="secondary" style={{ marginTop: '20px' }}>
          {textos[idioma].guardar}
        </IonButton>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', color: darkMode ? '#00ffcc' : '#888' }}>
          © 2025 Gamer App
        </div>
      </IonContent>

      <style>{`
        ion-card { border: 2px solid #00ffcc; border-radius: 12px; margin-bottom: 20px; }
        ion-card-header { background-color: ${darkMode ? '#111' : '#f1f1f1'}; color: ${darkMode ? '#00ffcc' : '#000'}; }
        ion-card-title { font-family: 'Press Start 2P', cursive; font-size: 14px; }
        ion-button { font-family: 'Press Start 2P', cursive; letter-spacing: 1px; }
      `}</style>
    </IonPage>
  );
}
