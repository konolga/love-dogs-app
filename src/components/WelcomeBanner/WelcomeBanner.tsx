import styles from './WelcomeBanner.module.css';

export const WelcomeBanner = () => {
  return (
    <div className={styles.welcomeBanner}>
      <h1 className={styles.welcomeTitle}>Welcome to the Dog Lovers App!</h1>
      <p className={styles.welcomeDescription}>Discover a variety of dog breeds and their characteristics.</p>
      <p className={styles.welcomeLoginPrompt}>Login to access exclusive features.</p>
    </div>
  );
};
