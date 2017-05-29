Javascript / projet final javascript
BARZELLINO MATTHIEU
M1 IFI

---
Mon projet est un jeu de "pong" jouable à deux joueurs.
Le jeu se joue avec les flèches de gauche et de droite.
L'objectif est d'obtenir le meilleur score.
Le jeu peut se jouer à 1 ou à 2 joueurs.
Le joueur 1 contrôle la raquette du bas et le joueur 2 la raquette du haut.
Les scores et balles ne sont pas synchronisées mais les raquettes le sont.

A chaque rebond les balles deviennent de plus en plus bleues, plus rapides et
rapportent plus de points au joueur.
Une stratégie à adopter peut donc être de privilégier les balles "bleues".

Le jeu se déroule en 3 niveaux. Le premier est un niveau simple et les niveaux 2 et 3
comportent des obstacles avec lequel il faut faire un maximum de rebond pour gagner des points.

Chaque balle que le joueur n'arrive pas à rattraper fait progresser le jeu.
A chaque balle rattrapée par sa raquette, le joueur gagne des points.
Lorsque la progression est de 100% le jeu s'arréte et les scores sont indiquées.

---
Commandes :
A : Démarrer la partie.
Flèches directionnelles bouger sa raquette.

Le jeu se lance en démarrant le serveur avec l'invite de commande de nodeJS
puis en allant sur la page du jeu (index.html).