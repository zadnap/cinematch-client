import { useEffect, useState } from 'react';
import styles from './Onboarding.module.scss';
import Button from '../../components/Button/Button';
import StepGenres from './StepGenres';
import StepMovies from './StepMovies';
import StepFinish from './StepFinish';
import useOnboarding from '@/hooks/useOnboading';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MIN_GENRES = 3;

const Onboarding = () => {
  const { refreshUser } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const {
    submitOnboarding,
    loading: finishLoading,
    error: finishError,
  } = useOnboarding();
  const navigate = useNavigate();

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleMovie = (id) => {
    setSelectedMovies((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    await submitOnboarding(selectedGenres, selectedMovies);
    await refreshUser();
    navigate('/');
  };

  useEffect(() => {
    setSelectedMovies([]);
  }, [selectedGenres]);

  return (
    <main className={styles.onboarding}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.currentStep}>Step {step} of 3</p>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <h1>
            {step === 1
              ? 'Which genres do you like?'
              : step === 2
                ? 'Pick movies you have seen'
                : 'Excellent!'}
          </h1>
          {step === 1 && selectedGenres.length < MIN_GENRES && (
            <p className={styles.instruction}>
              Please select at least {MIN_GENRES - selectedGenres.length} more
              to continue
            </p>
          )}
        </header>

        <section className={styles.content}>
          {step === 1 && (
            <StepGenres
              selectedGenres={selectedGenres}
              onToggle={toggleGenre}
            />
          )}
          {step === 2 && (
            <StepMovies
              selectedGenres={selectedGenres}
              selectedMovies={selectedMovies}
              onToggle={toggleMovie}
            />
          )}
          {step === 3 && (
            <StepFinish
              error={finishError}
              selectedGenres={selectedGenres}
              selectedMovies={selectedMovies}
            />
          )}
        </section>

        <footer className={styles.actions}>
          {step > 1 && (
            <Button
              className={styles.backBtn}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              disabled={step === 1 && selectedGenres.length < MIN_GENRES}
              onClick={() => setStep(step + 1)}
              accent
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              accent
              disabled={finishLoading}
              loading={finishLoading}
              loadingText="Processing"
            >
              Start Exploring
            </Button>
          )}
        </footer>
      </div>
    </main>
  );
};

export default Onboarding;
