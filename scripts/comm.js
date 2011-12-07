la = liste des amis
lc = []

Tant que |la| > 0:
   enlever un sommet v de la
   pour tout c de lc: // c est une communauté (liste)
     si c U {v} a une cohérence supérieure à c : on ajoute v à c
     FinPourTout
   si on n'a ajouté v à aucun c de lc, on ajoute [v] à lc
 Fin TantQue