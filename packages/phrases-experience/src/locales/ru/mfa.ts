const mfa = {
  totp: 'OTP приложения аутентификации',
  webauthn: 'Ключ доступа',
  backup_code: 'Резервный код',
  link_totp_description: 'Свяжите Google Authenticator и другие приложения',
  link_webauthn_description: 'Свяжите ваше устройство или USB-устройство.',
  link_backup_code_description: 'Сгенерируйте резервный код',
  verify_totp_description: 'Введите одноразовый код в приложении',
  verify_webauthn_description: 'Подтвердите ваше устройство или USB-устройство',
  verify_backup_code_description: 'Вставьте резервный код, который вы сохранили',
  add_mfa_factors: 'Добавьте двухфакторную аутентификацию',
  add_mfa_description:
    'Двухфакторная аутентификация включена. Выберите ваш второй метод верификации для безопасного входа в учетную запись.',
  verify_mfa_factors: 'Двухфакторная аутентификация',
  verify_mfa_description:
    'Для этой учетной записи включена двухфакторная аутентификация. Пожалуйста, выберите второй способ подтверждения вашей личности.',
  add_authenticator_app: 'Добавить приложение аутентификации',
  step: 'Шаг {{step, number}}: {{content}}',
  scan_qr_code: 'Отсканируйте этот QR-код',
  scan_qr_code_description:
    'Отсканируйте этот QR-код с помощью вашего приложения аутентификации, такого как Google Authenticator, Duo Mobile, Authy и т. д.',
  qr_code_not_available: 'Не удается отсканировать QR-код?',
  copy_and_paste_key: 'Скопируйте и вставьте ключ',
  copy_and_paste_key_description:
    'Вставьте следующий ключ в ваше приложение аутентификации, такое как Google Authenticator, Duo Mobile, Authy и т. д.',
  want_to_scan_qr_code: 'Хотите отсканировать QR-код?',
  enter_one_time_code: 'Введите одноразовый код',
  enter_one_time_code_link_description:
    'Введите 6-значный код верификации, сгенерированный приложением аутентификации.',
  enter_one_time_code_description:
    'Для этой учетной записи включена двухфакторная аутентификация. Пожалуйста, введите одноразовый код, отображаемый в вашем подключенном приложении аутентификации.',
  link_another_mfa_factor: 'Свяжите другой метод двухфакторной аутентификации',
  save_backup_code: 'Сохраните резервный код',
  save_backup_code_description:
    'Вы можете использовать один из этих резервных кодов для доступа к своей учетной записи в случае проблем при двухфакторной аутентификации другими способами. Каждый код можно использовать только один раз.',
  backup_code_hint: 'Убедитесь, что вы их скопировали и сохранили в безопасном месте.',
  enter_a_backup_code: 'Введите резервный код',
  enter_backup_code_description:
    'Введите резервный код, который вы сохранили, когда двухфакторная аутентификация была включена впервые.',
  create_a_passkey: 'Создайте ключ доступа',
  create_passkey_description:
    'Зарегистрируйте ключ доступа для верификации с помощью пароля вашего устройства или биометрии, сканирования QR-кода или использования USB-ключа безопасности, такого как YubiKey.',
  name_your_passkey: 'Дайте имя вашему ключу доступа',
  name_passkey_description:
    'Вы успешно верифицировали это устройство для двухфакторной аутентификации. Настройте имя для его распознавания, если у вас есть несколько ключей.',
  try_another_verification_method: 'Попробуйте другой метод верификации',
  verify_via_passkey: 'Подтвердить через ключ доступа',
  verify_via_passkey_description:
    'Используйте ключ доступа для верификации с помощью пароля вашего устройства или биометрии, сканирования QR-кода или использования USB-ключа безопасности, такого как YubiKey.',
  secret_key_copied: 'Секретный ключ скопирован.',
  backup_code_copied: 'Резервный код скопирован.',
  /** UNTRANSLATED */
  webauthn_not_ready: 'WebAuthn is not ready yet. Please try again later.',
  /** UNTRANSLATED */
  webauthn_not_supported: 'WebAuthn is not supported in this browser.',
  /** UNTRANSLATED */
  webauthn_failed_to_create: 'Failed to create. Please try again.',
  /** UNTRANSLATED */
  webauthn_failed_to_verify: 'Failed to verify. Please try again.',
};

export default Object.freeze(mfa);
