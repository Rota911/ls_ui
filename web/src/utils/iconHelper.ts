import * as TablerIcons from '@tabler/icons-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

library.add(fas, far, fab);

export const getIconComponent = (iconName: string) => {
  if (iconName.includes(' ')) {
    const parts = iconName.split(' ');
    let prefix: IconPrefix = 'fas';
    let iconParts: string[] = [];
    
    if (parts[0] === 'fa-brands' || parts[0] === 'fa-brand') {
      prefix = 'fab';
    } else if (parts[0] === 'fa-regular') {
      prefix = 'far';
    } else if (parts[0] === 'fa-solid') {
      prefix = 'fas';
    } else if (parts[0] === 'fas') {
      prefix = 'fas';
    } else if (parts[0] === 'far') {
      prefix = 'far';
    } else if (parts[0] === 'fab') {
      prefix = 'fab';
    }
    
    if (parts.length > 1) {
      let iconName = parts[1];
      
      if (iconName.startsWith('fa-')) {
        iconParts = iconName.split('-');
        iconParts.shift();
      } else {
        iconParts = iconName.split('-');
      }
        const name = iconParts.join('-') as IconName;
      
      return (props: any) => React.createElement(FontAwesomeIcon, { 
        icon: [prefix, name],
        ...props
      });
    }
  }
  
  if (iconName.startsWith('fa-') || iconName.startsWith('fab-') || iconName.startsWith('far-')) {
    const parts = iconName.split('-');
    let prefix: IconPrefix = 'fas';
    
    if (parts[0] === 'fab') {
      prefix = 'fab';
      parts.shift();
    } else if (parts[0] === 'far') {
      prefix = 'far';
      parts.shift();
    } else if (parts[0] === 'fa') {
      parts.shift();
    }
      const name = parts.join('-') as IconName;
    
    return (props: any) => React.createElement(FontAwesomeIcon, { 
      icon: [prefix, name],
      ...props
    });
  }
  
  const hasIconPrefix = iconName.startsWith('Icon');
  const cleanName = hasIconPrefix ? iconName.substring(4) : iconName;
  
  const splitByCapital = cleanName.split(/(?=[A-Z])/).map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
    const formattedName = splitByCapital.charAt(0).toUpperCase() + splitByCapital.slice(1);
  const finalIconName = `Icon${formattedName}`;
  
  return (TablerIcons as any)[finalIconName];
};
