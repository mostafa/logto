const organizations = {
  organization: 'Организация',
  page_title: 'Организации',
  title: 'Организации',
  subtitle:
    'Организации обычно используются в SaaS или подобных многоклиентских приложениях и представляют ваших клиентов - это команды, организации или целые компании. Организации действуют как основной элемент для аутентификации и авторизации B2B.',
  organization_template: 'Шаблон организации',
  organization_id: 'Идентификатор организации',
  members: 'Участники',
  machine_to_machine: 'Приложения машина-машина',
  create_organization: 'Создать организацию',
  setup_organization: 'Настройка вашей организации',
  organization_list_placeholder_title: 'Организация',
  organization_list_placeholder_text:
    'Организации часто используются в SaaS или подобных многоклиентских приложениях как лучшая практика. Они позволяют вам разрабатывать приложения, которые позволяют клиентам создавать и управлять организациями, приглашать участников и назначать роли.',
  organization_name_placeholder: 'Моя организация',
  organization_description_placeholder: 'Краткое описание организации',
  organization_permission: 'Разрешение организации',
  organization_permission_other: 'Разрешения организации',
  create_permission_placeholder: 'Чтение истории назначений',
  organization_role: 'Роль организации',
  organization_role_other: 'Роли организации',
  organization_role_description:
    'Роль организации - это группировка разрешений, которые могут быть назначены пользователям. Разрешения должны быть взяты из предопределенных разрешений организации.',
  role: 'Роль',
  search_placeholder: 'Поиск по названию организации или ID',
  search_role_placeholder: 'Начните вводить для поиска и выбора ролей',
  empty_placeholder: '🤔 У вас пока нет никаких {{entity}}.',
  organization_and_member: 'Организация и участник',
  organization_and_member_description:
    'Организация - это группа пользователей, представляющая команды, деловых клиентов и партнерские компании, причем каждый пользователь является "Участником". Эти сущности могут быть фундаментальными для удовлетворения ваших требований мультиаренды.',
  guide: {
    title: 'Начать с руководств',
    subtitle: 'Начните настройку вашей организации с наших руководств',
    introduction: {
      title: 'Давайте разберем, как устроена организация в Logto',
      section_1: {
        title: 'Организация - это группа пользователей (идентификаторов)',
      },
      section_2: {
        title: 'Шаблон организации предназначен для контроля доступа мультиарендных приложений',
        description:
          'В мультиарендных SaaS-приложениях несколько организаций часто разделяют один и тот же шаблон контроля доступа, включая разрешения и роли. В Logto мы называем это "шаблон организации".',
        permission_description:
          'Разрешение организации относится к авторизации доступа к ресурсу в контексте организации.',
        role_description_deprecated:
          'Роль организации - это группировка разрешений организации, которые могут быть назначены участникам.',
        role_description:
          'Роль организации представляет собой группировку организационных разрешений или разрешений API, которые могут быть назначены членам.',
      },
      section_3: {
        title: 'Могу ли я назначить разрешения API организационным ролям?',
        description:
          'Да, вы можете назначить разрешения API организационным ролям. Logto предоставляет гибкость в управлении ролями вашей организации, позволяя включать в эти роли как организационные, так и разрешения API.',
      },
      section_4: {
        title: 'Взаимодействие с иллюстрацией для просмотра связей',
        description:
          'Давайте рассмотрим пример. Джон и Сара находятся в разных организациях с разными ролями в контексте разных организаций. Наведите указатель на различные модули и посмотрите, что происходит.',
      },
    },
    organization_permissions: 'Разрешения организации',
    organization_roles: 'Роли организации',
    admin: 'Администратор',
    member: 'Участник',
    guest: 'Гость',
    role_description:
      'Роль "{{role}}" использует один и тот же шаблон организации для различных организаций.',
    john: 'Джон',
    john_tip:
      'Джон принадлежит двум организациям с адресом электронной почты "john@email.com" в качестве единственного идентификатора. Он является администратором организации A, а также гостем организации B.',
    sarah: 'Сара',
    sarah_tip:
      'Сара принадлежит одной организации с адресом электронной почты "sarah@email.com" в качестве единственного идентификатора. Она является администратором организации B.',
  },
};

export default Object.freeze(organizations);
