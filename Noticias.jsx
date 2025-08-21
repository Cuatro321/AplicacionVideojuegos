import React, { useEffect, useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonBadge, IonButton, IonIcon, IonModal, IonImg, IonLabel 
} from '@ionic/react';
import { notificationsOutline, star, close, arrowBack, arrowForward } from 'ionicons/icons';

export default function Noticias() {
  useEffect(() => {
    console.log('Página cargada: Noticias');
  }, []);

  const noticias = [
    {
      id: 1,
      titulo: 'Nuevo DLC anunciado',
      fecha: '2025-08-10',
      descripcion: 'Descubre nuevas aventuras y misiones en el próximo DLC de tu juego favorito.',
      contenido: 'Contenido completo del DLC: mapas, personajes, armas, y mucho más. Prepárate para la experiencia definitiva.',
      imagenes: [
        'https://play-lh.googleusercontent.com/27O5tpaYE82W6m30rJ_MX3-UvshlDM6O8oXDxb6GseYW2T7P8UNT19727MGmz-0q3w',
        'https://education.minecraft.net/content/dam/education-edition/game-characters/teach_any_subject.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Minecraft-creeper-face.jpg/960px-Minecraft-creeper-face.jpg'
      ]
    },
    {
      id: 2,
      titulo: 'Torneo internacional de eSports',
      fecha: '2025-08-12',
      descripcion: 'Equipos de todo el mundo competirán por la gloria y premios multimillonarios.',
      contenido: 'Detalles del torneo: fechas, reglas, equipos participantes y cómo seguirlo en vivo. ¡No te lo pierdas!',
      imagenes: [
        'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b',
        'https://support-leagueoflegends.riotgames.com/hc/article_attachments/18710658816659',
        'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/f136500bd46f823d37515a72b867425d3a0b3e54-1628x1628.png'
      ]
    },
    {
      id: 3,
      titulo: 'Remaster sorpresa de clásico retro',
      fecha: '2025-08-15',
      descripcion: 'Vuelve a jugar el clásico que marcó tu infancia, ahora en versión remasterizada.',
      contenido: 'Remaster incluye gráficos HD, música remasterizada, logros y modos extra. Ideal para nostálgicos.',
      imagenes: [
        'https://cdn1.epicgames.com/offer/e9a679451d094c1ba3d008b6a01adec5/EGS_FINALFANTASYVIIREBIRTH_SquareEnix_S1_2560x1440-e254f978084058f898118dc49728d04c',
        'https://i.blogs.es/ed14b8/ffviiremake/1366_2000.jpeg',
        'https://images-na.ssl-images-amazon.com/images/I/81Wr+C2ZtFL._AC_UL600_SR600,600_.jpg'
      ]
    }
  ];

  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const handleNext = () => {
    if (selected) setImgIndex((imgIndex + 1) % selected.imagenes.length);
  };

  const handlePrev = () => {
    if (selected) setImgIndex((imgIndex - 1 + selected.imagenes.length) % selected.imagenes.length);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>
            <IonIcon icon={notificationsOutline} /> Noticias Gamer
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="noticias-container">
          {noticias.map(n => (
            <IonCard key={n.id} className="card-noticia">
              {n.imagenes && n.imagenes[0] && <IonImg src={n.imagenes[0]} className="card-img"/>}
              <IonCardHeader>
                <IonCardTitle>{n.titulo}</IonCardTitle>
                <IonBadge color="tertiary">{n.fecha}</IonBadge>
              </IonCardHeader>
              <IonCardContent>
                <p>{n.descripcion}</p>
                <div className="calificacion">
                  {Array.from({ length: Math.floor(Math.random() * 3 + 3) }).map((_, i) => (
                    <IonIcon key={i} icon={star} />
                  ))}
                </div>
                <IonButton expand="block" color="success" onClick={() => { setSelected(n); setImgIndex(0); }}>Leer más</IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        <IonModal isOpen={!!selected} onDidDismiss={() => setSelected(null)} className="modal-noticia">
          {selected && (
            <>
              <IonHeader>
                <IonToolbar color="dark">
                  <IonTitle>{selected.titulo}</IonTitle>
                  <IonButton slot="end" fill="clear" onClick={() => setSelected(null)}>
                    <IonIcon icon={close} />
                  </IonButton>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding modal-scroll">
                <div className="carousel-container">
                  <IonButton fill="clear" onClick={handlePrev}><IonIcon icon={arrowBack} /></IonButton>
                  <IonImg src={selected.imagenes[imgIndex]} className="modal-img"/>
                  <IonButton fill="clear" onClick={handleNext}><IonIcon icon={arrowForward} /></IonButton>
                </div>
                <IonLabel className="modal-contenido">{selected.contenido}</IonLabel>
                <div className="modal-fecha">
                  <IonBadge color="primary">{selected.fecha}</IonBadge>
                  <IonBadge color="success">Gamer News</IonBadge>
                </div>
              </IonContent>
            </>
          )}
        </IonModal>

        <style>{`
          ion-content {
            --background: #0b0c10;
            font-family: 'Press Start 2P', cursive;
            color: #c5c6c7;
          }

          .noticias-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .card-noticia {
            border-radius: 15px;
            background: linear-gradient(145deg, #1f2833, #2c3e50);
            box-shadow: 0 0 10px #66fcf1, 0 0 20px #45a29e;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .card-noticia:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 0 20px #66fcf1, 0 0 30px #45a29e;
          }

          .card-img {
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            max-height: 200px;
            object-fit: cover;
          }

          ion-card-title {
            font-size: 1rem;
            color: #66fcf1;
            text-shadow: 1px 1px 2px #0b0c10;
          }

          ion-badge {
            margin-top: 5px;
            font-size: 0.7rem;
            background-color: #45a29e;
            color: #0b0c10;
          }

          .calificacion ion-icon {
            color: #ffd700;
            margin-right: 2px;
          }

          ion-button {
            margin-top: 10px;
            --background: #45a29e;
            --color: #0b0c10;
            --box-shadow: 0 0 5px #66fcf1, 0 0 10px #45a29e;
          }
          ion-button:hover {
            --box-shadow: 0 0 10px #66fcf1, 0 0 20px #45a29e;
          }

          .modal-noticia {
            --background: #1f2833;
            color: #c5c6c7;
          }

          .carousel-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 15px;
          }

          .modal-img {
            border-radius: 15px;
            max-height: 250px;
            max-width: 80%;
            object-fit: cover;
          }

          .modal-contenido {
            display: block;
            margin-top: 10px;
            font-size: 0.8rem;
            line-height: 1.5;
            color: #c5c6c7;
          }

          .modal-fecha {
            display: flex;
            gap: 10px;
            margin-top: 15px;
          }

          .modal-scroll {
            overflow-y: auto;
          }
        `}</style>
      </IonContent>
    </IonPage>
  );
}
