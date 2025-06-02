import React from 'react';

export function withRouter(Component) {
  return function WithRouterWrapper(props) {
    const [currentPath, setCurrentPath] = React.useState(window.location.hash.slice(1) || '/');

    React.useEffect(() => {
      const handleHashChange = () => {
        setCurrentPath(window.location.hash.slice(1) || '/');
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return <Component {...props} currentPath={currentPath} />;
  };
} 