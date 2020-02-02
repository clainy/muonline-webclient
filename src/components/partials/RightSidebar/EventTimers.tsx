import React, { useState, useEffect } from 'react';

// Partials
import ContentBlock from 'components/partials/RightSidebar/ContentBlock';

// Actions
import getEvents from 'actions/configs/events';

interface Props {}

const EventTimers: React.FC<Props> = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    const eventsInit = async () => {
      const list = await getEvents();
      setEvents(list);
    };

    eventsInit();
  }, []);

  return (
    <ContentBlock title='server events' desc='server events schedule'>
      <div className='EventTimers'>
        {!events
          ? 'loading...'
          : events.map((event: any, i: number) => (
              <Event key={i} event={event} />
            ))}
      </div>
    </ContentBlock>
  );
};

interface EventProps {
  event: {
    name: string;
    hours: string[];
  };
}

const Event: React.FC<EventProps> = ({ event: { name, hours } }) => {
  const [hour, setHour] = useState('00:00');
  const [left, setLeft] = useState('00:00:00');

  useEffect(() => {
    const addZero = (num: number) => (num < 10 ? '0' + num : num);

    const secondsTransform = (secs: number) => {
      const hour = Math.floor(secs / 60 / 60);
      const min = Math.floor(secs / 60 - hour * 60);
      const sec = Math.floor(secs - hour * 60 * 60 - min * 60);

      return `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    };

    const interval = setInterval(() => {
      const date = new Date();
      const secs =
        (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();

      for (let i = 0; i < hours.length; i++) {
        const [hour, min] = hours[i].split(':');
        const mySecs = (Number(hour) * 60 + Number(min)) * 60;
        if (mySecs > secs) {
          setHour(hours[i]);
          setLeft(secondsTransform(mySecs - secs));
          break;
        } else if (i === hours.length - 1) {
          const [hour1, sec1] = hours[0].split(':');
          const newSecs =
            1440 * 60 - secs + (Number(hour1) * 60 + Number(sec1)) * 60;
          setHour(hours[0]);
          setLeft(secondsTransform(newSecs));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours]);

  return (
    <div className='event'>
      <div className='event-title'>
        <div>{name}</div>
        <div>{hour}</div>
      </div>
      <div className='event-desc'>
        <div>starts in</div>
        <div>{left}</div>
      </div>
    </div>
  );
};

export default EventTimers;
