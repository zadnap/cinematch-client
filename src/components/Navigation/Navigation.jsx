import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import {
  faCalendar,
  faFire,
  faHeart,
  faRightToBracket,
  faSignOut,
  faStar,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';
import TrailerPreview from '@/components/TrailerPreview/TrailerPreview';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from '../Popup/Popup';
import usePopup from '../../hooks/usePopup';
import usePreviewTrailers from '../../hooks/usePreviewTrailers';
import { useNavigate } from 'react-router-dom';

function Navigation({ isOnTablet, isOpenNav, setIsOpenNav }) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { showPopup, hidePopup } = usePopup();
  const { trailers, loading, error } = usePreviewTrailers();

  const handleSignOut = () => {
    showPopup({
      title: 'Sign Out',
      content: 'Are you sure to sign out of CineMatch?',
      onConfirm: () => {
        signOut();
        hidePopup();
        navigate('/auth');
      },
      onCancel: hidePopup,
    });
  };

  const topItems = [
    {
      to: '/',
      icon: faHouse,
      title: 'Home',
    },
    {
      to: '/for-you',
      icon: faStar,
      title: 'For You',
    },
    {
      to: '/favourites',
      icon: faHeart,
      title: 'Favourites',
    },
    {
      to: '/upcoming',
      icon: faCalendar,
      title: 'Coming Soon',
    },
    {
      to: '/trending',
      icon: faFire,
      title: 'Trending',
    },
  ];
  const filteredItems = topItems.filter((item) => {
    if (item.to === '/favourites' && !user) return false;
    if (item.to === '/for-you' && !user) return false;
    return true;
  });

  return (
    isOpenNav && (
      <div
        className={styles.navOverlay}
        onClick={isOnTablet ? undefined : () => setIsOpenNav(false)}
      >
        <nav className={styles.navigation}>
          {!isOnTablet && (
            <div className={styles.itemSet}>
              {user ? (
                <li className={styles.userAction}>
                  <div className={styles.username}>@{user.username}</div>
                  <Button
                    outline
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSignOut();
                    }}
                    className={styles.signOutBtn}
                    aria-label="Sign out"
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                  </Button>
                </li>
              ) : (
                <>
                  <li>
                    <NavItem icon={faRightToBracket} to="/auth/sign-in">
                      Sign In
                    </NavItem>
                  </li>
                  <li>
                    <NavItem icon={faUserPlus} to="auth/sign-up">
                      Sign Up
                    </NavItem>
                  </li>
                </>
              )}
            </div>
          )}
          <div className={styles.itemSet}>
            {filteredItems.map((item) => (
              <li key={item.to}>
                <NavItem icon={item.icon} to={item.to}>
                  {item.title}
                </NavItem>
              </li>
            ))}
          </div>
          <div className={styles.itemSet}>
            <h3 className={styles.watchingTrailers}>Watching Trailers</h3>
            <ul
              className={styles.trailerList}
              onClick={(e) => e.stopPropagation()}
            >
              {loading && <Loader />}
              {error && <ErrorMessage message={error} />}
              {!loading &&
                !error &&
                trailers.map((preview) => (
                  <li className={styles.trailerItem} key={preview.id}>
                    <TrailerPreview
                      trailerKey={preview.trailerKey}
                      title={preview.title}
                      year={preview.year}
                      backdropSrc={preview.backdropSrc}
                      rating={preview.rating}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </div>
    )
  );
}

export default Navigation;
