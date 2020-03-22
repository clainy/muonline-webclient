import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid/v4';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getConfig } from 'actions/config';

// Types
import AppState from 'redux/types/app';

// Config Files
import Events from './config/Events';
import OnlineTime from './config/OnlineTime';
import Reset from './config/Reset';
import Vip from './config/Vip';
import Stats from './config/Stats';
import Resources from './config/Resources';
import Downloads from './config/Downloads';
import ItemsList from './config/ItemsList';

interface Props {}

const Config: React.FC<Props> = () => {
  const [selected, setSelected] = useState<string>();

  const { loading } = useSelector((state: AppState) => state.user.admin);
  const config = useSelector((state: AppState) => state.config);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);

  const renderConfig = (config: string) => {
    switch (config) {
      case 'events':
        return <Events />;
      case 'online_time':
        return <OnlineTime />;
      case 'reset':
        return <Reset />;
      case 'vip':
        return <Vip />;
      case 'stats':
        return <Stats />;
      case 'resources':
        return <Resources />;
      case 'downloads':
        return <Downloads />;
      case 'itemsList':
        return <ItemsList />;
    }
  };

  return (
    <div className='AdminConfig'>
      {loading ? (
        <Loader />
      ) : !config ? (
        "Couldn't load config"
      ) : (
        <div>
          <div className='controls'>
            <select
              onChange={e => setSelected(e.target.value)}
              defaultValue={selected!}
            >
              <option>-</option>
              {Object.entries(config).map(([name]) => (
                <option key={uuid()} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className='selected'>
            {!selected ? 'Start by selecting a config' : renderConfig(selected)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Config;
