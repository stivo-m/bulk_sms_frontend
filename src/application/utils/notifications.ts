import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export type NotificationType = 'success' | 'warning' | 'danger';

export type NotificationProps = {
  type: NotificationType;
  message: string;
  title: string;
};

export const showNotification = ({ type, title, message }: NotificationProps) => {
  notifications.show({
    title: title,
    message: message,
    color: type == 'danger' ? 'red' : type == 'warning' ? 'yellow' : 'green',
    // icon: <IconX />,
    // icon: <IconCheck size="1rem" />,
  });
};
