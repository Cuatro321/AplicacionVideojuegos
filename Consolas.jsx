import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonBadge,
  IonButton,
  IonIcon,
  IonLabel,
  IonChip,
  IonProgressBar,
  IonToast
} from '@ionic/react';
import {
  gameController,
  star,
  starOutline,
  heart,
  heartOutline,
  flash,
  cart,
  checkmarkCircle
} from 'ionicons/icons';

const CONSOLAS = [
  {
    nombre: 'PlayStation 5',
    img: 'https://resources.sears.com.mx/medios-plazavip/fotos/productos_sears1/original/4312617.jpg',
    descripcion: 'La consola de Sony con gráficos de nueva generación y exclusivo catálogo de juegos.',
    popularidad: 5,
    nueva: true
  },
  {
    nombre: 'Xbox Series X',
    img: 'https://cms-assets.xboxservices.com/assets/d1/2c/d12cd3b8-3880-4dd4-8fe5-dc072a7904f0.png?n=642227_Hero-Gallery-0_C4_857x676.png',
    descripcion: 'Potente consola de Microsoft con rendimiento excepcional y Xbox Game Pass.',
    popularidad: 4,
    nueva: false
  },
  {
    nombre: 'Nintendo Switch',
    img: 'https://m.media-amazon.com/images/I/61i421VnFYL.jpg',
    descripcion: 'Consola híbrida que puedes usar en casa o en movimiento con juegos icónicos.',
    popularidad: 4,
    nueva: true
  }
];

export default function Consolas() {
  useEffect(() => {
    console.log('Página cargada: Consolas');
  }, []);

  // Estados por tarjeta
  const [favs, setFavs] = useState(CONSOLAS.map(() => false));
  const [ratings, setRatings] = useState(CONSOLAS.map((c) => c.popularidad));
  const [addingToCart, setAddingToCart] = useState(CONSOLAS.map(() => false));
  const [toast, setToast] = useState({ open: false, msg: '' });

  const toggleFav = (i) => {
    setFavs((prev) => {
      const copy = [...prev];
      copy[i] = !copy[i];
      return copy;
    });
  };

  const setRating = (i, value) => {
    setRatings((prev) => {
      const copy = [...prev];
      copy[i] = value;
      return copy;
    });
  };

  const addToCart = (i) => {
    setAddingToCart((prev) => {
      const copy = [...prev];
      copy[i] = true;
      return copy;
    });
    setToast({ open: true, msg: 'Añadido al carrito' });

    setTimeout(() => {
      setAddingToCart((prev) => {
        const copy = [...prev];
        copy[i] = false;
        return copy;
      });
    }, 1200);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Consolas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {CONSOLAS.map((c, idx) => {
              const isFav = favs[idx];
              const rating = ratings[idx];
              const inCart = addingToCart[idx];

              return (
                <IonCol size="12" sizeMd="4" key={c.nombre}>
                  <IonCard className="card-videojuego">
                    <IonImg src={c.img} alt={c.nombre} />
                    <IonCardHeader>
                      <IonCardTitle className="titulo-card">
                        <span className="titulo-texto">{c.nombre}</span>

                        <IonChip color="tertiary" className="ion-margin-start">
                          <IonIcon icon={gameController} />
                          <IonLabel>Console</IonLabel>
                        </IonChip>

                        {c.nueva && (
                          <IonBadge color="danger" className="ion-margin-start">
                            <IonIcon icon={flash} /> Nuevo
                          </IonBadge>
                        )}
                      </IonCardTitle>

                      {/* Estrellas interactivas */}
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const value = i + 1;
                          const filled = value <= rating;
                          return (
                            <IonButton
                              key={i}
                              className={'star-btn ' + (filled ? 'star-filled' : '')}
                              fill="clear"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRating(idx, value);
                              }}
                            >
                              <IonIcon icon={filled ? star : starOutline} />
                            </IonButton>
                          );
                        })}
                      </div>
                    </IonCardHeader>

                    <IonCardContent>
                      <p>{c.descripcion}</p>

                      {/* Barra de progreso ligada a la calificación */}
                      <IonProgressBar
                        value={rating / 5}
                        color="success"
                        className="ion-margin-bottom"
                      />

                      <div className="botones">
                        <IonButton
                          expand="block"
                          color="success"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Ver juegos
                        </IonButton>

                        {/* Comprar con animación y cambio de contenido */}
                        <IonButton
                          expand="block"
                          color={inCart ? 'medium' : 'primary'}
                          className={'btn-comprar ' + (inCart ? 'added' : '')}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(idx);
                          }}
                        >
                          <IonIcon slot="start" icon={inCart ? checkmarkCircle : cart} />
                          {inCart ? 'Añadido al carrito' : 'Comprar'}
                        </IonButton>

                        {/* Favorito con animación */}
                        <IonButton
                          fill="outline"
                          color={isFav ? 'danger' : 'medium'}
                          className={'btn-fav ' + (isFav ? 'fav-anim-in' : 'fav-anim-out')}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFav(idx);
                          }}
                        >
                          <IonIcon icon={isFav ? heart : heartOutline} />
                          <span className="fav-label">
                            {isFav ? 'Favorito' : 'Marcar favorito'}
                          </span>
                        </IonButton>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={toast.open}
          message={toast.msg}
          duration={900}
          position="bottom"
          onDidDismiss={() => setToast({ open: false, msg: '' })}
        />

        <style>{`
          .card-videojuego {
            transition: transform 0.3s, box-shadow 0.3s;
            border-radius: 15px;
            overflow: hidden;
          }
          .card-videojuego:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0, 255, 204, 0.4);
          }
          .titulo-card {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
          }
          .titulo-texto {
            font-family: 'Press Start 2P', cursive;
            font-size: 1rem;
          }
          ion-card-content p {
            font-size: 0.9rem;
            margin-bottom: 8px;
          }
          .botones ion-button {
            margin-top: 6px;
          }

          /* Estrellas interactivas */
          .stars {
            display: flex;
            gap: 2px;
            margin-top: 6px;
          }
          .star-btn {
            --padding-start: 2px;
            --padding-end: 2px;
            --ripple-color: transparent;
            transform: scale(1);
            transition: transform 0.12s ease;
          }
          .star-btn:hover { transform: scale(1.1); }
          .star-filled ion-icon {
            filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.5));
          }

          /* Comprar: animación cuando se añade */
          .btn-comprar.added {
            animation: pulse 0.6s ease;
          }
          @keyframes pulse {
            0%   { transform: scale(1); }
            50%  { transform: scale(1.03); }
            100% { transform: scale(1); }
          }

          /* Favorito: animaciones entrada/salida */
          .btn-fav {
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .fav-label {
            margin-left: 6px;
          }
          .fav-anim-in {
            animation: pop-in 200ms ease;
          }
          .fav-anim-out {
            animation: pop-out 200ms ease;
          }
          @keyframes pop-in {
            0% { transform: scale(0.9); }
            60% { transform: scale(1.12); }
            100% { transform: scale(1); }
          }
          @keyframes pop-out {
            0% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </IonContent>
    </IonPage>
  );
}
