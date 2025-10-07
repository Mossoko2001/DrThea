# Guide d'hébergement du Portfolio sur Vercel

Ce guide vous explique étape par étape comment déployer votre portfolio sur Vercel, une plateforme d'hébergement gratuite et performante pour les sites statiques.

## Étape 1 : Créer un compte Vercel

1. Rendez-vous sur [Vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up" en haut à droite
3. Choisissez de vous connecter avec GitHub, GitLab, Bitbucket ou votre email
4. Suivez les instructions pour compléter votre inscription
5. Vérifiez votre email si nécessaire pour confirmer votre compte

## Étape 2 : Préparer votre projet pour le déploiement

1. Assurez-vous que votre projet est prêt pour le déploiement :
   - Tous les liens sont relatifs (pas de chemins absolus)
   - Les images et ressources sont correctement référencées
   - Le formulaire de contact fonctionne correctement

2. Si vous utilisez Git, assurez-vous que votre projet est dans un dépôt Git (GitHub, GitLab ou Bitbucket)
   - Si ce n'est pas le cas, créez un nouveau dépôt et poussez votre code

3. Si vous n'utilisez pas Git, vous pourrez télécharger directement votre projet

## Étape 3 : Déployer sur Vercel

### Option A : Déploiement depuis un dépôt Git (recommandé)

1. Connectez-vous à votre compte Vercel
2. Cliquez sur "Add New..." puis "Project"
3. Importez votre dépôt Git en le sélectionnant dans la liste
4. Configurez votre projet :
   - Framework Preset : Sélectionnez "Other" (puisque c'est un site HTML/CSS/JS simple)
   - Build and Output Settings : Laissez les paramètres par défaut
   - Environment Variables : Ajoutez-en si nécessaire (généralement pas besoin pour un portfolio statique)
5. Cliquez sur "Deploy"

### Option B : Déploiement direct (sans Git)

1. Connectez-vous à votre compte Vercel
2. Cliquez sur "Add New..." puis "Project"
3. En bas de page, cliquez sur "Upload" dans la section "Import Third-Party Git Repository"
4. Compressez votre projet en fichier .zip
5. Glissez-déposez le fichier .zip ou cliquez pour le sélectionner
6. Configurez votre projet comme dans l'Option A
7. Cliquez sur "Deploy"

## Étape 4 : Configurer votre domaine (optionnel)

1. Une fois le déploiement terminé, Vercel vous attribuera un domaine du type `votre-projet.vercel.app`
2. Pour utiliser un domaine personnalisé :
   - Allez dans les paramètres de votre projet
   - Cliquez sur "Domains"
   - Ajoutez votre domaine personnalisé
   - Suivez les instructions pour configurer les enregistrements DNS

## Étape 5 : Vérifier et tester votre site

1. Cliquez sur l'URL fournie par Vercel pour visiter votre site
2. Testez toutes les fonctionnalités :
   - Navigation
   - Affichage des images
   - Carousel
   - Formulaire de contact (mailto)
   - Responsive design (sur mobile et desktop)

## Maintenance et mises à jour

### Pour mettre à jour votre site :

#### Si vous utilisez Git :
1. Modifiez vos fichiers localement
2. Committez vos changements
3. Poussez vers votre dépôt Git
4. Vercel détectera automatiquement les changements et redéploiera votre site

#### Si vous avez fait un déploiement direct :
1. Allez dans votre projet sur Vercel
2. Cliquez sur "Deployments"
3. Cliquez sur "New Deployment"
4. Téléchargez à nouveau votre projet mis à jour

## Avantages de Vercel

- Hébergement gratuit pour les projets personnels
- Déploiements automatiques depuis Git
- Certificat SSL gratuit (HTTPS)
- CDN mondial pour des performances optimales
- Interface simple et intuitive
- Prévisualisations pour chaque déploiement

## Ressources utiles

- [Documentation Vercel](https://vercel.com/docs)
- [Guides de déploiement](https://vercel.com/guides)
- [Support Vercel](https://vercel.com/support)

---

Félicitations ! Votre portfolio est maintenant en ligne et accessible au monde entier via Vercel.