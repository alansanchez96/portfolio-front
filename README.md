# portfolio-vuecli

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### EmailJS
Create a local `.env` file with the EmailJS credentials:

```
VUE_APP_EMAILJS_SERVICE_ID=your_service_id
VUE_APP_EMAILJS_TEMPLATE_ID_CONTACT=your_contact_template_id
VUE_APP_EMAILJS_TEMPLATE_ID_VISIT=your_visit_template_id
VUE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

`VUE_APP_EMAILJS_TEMPLATE_ID_VISIT` is optional. If it is not defined, visit notifications use `VUE_APP_EMAILJS_TEMPLATE_ID`.

For the visit notification template, configure the EmailJS recipient as `{{to_email}}` or directly as `alansan96.cy@gmail.com`.
The app sends these useful variables: `subject`, `message`, `visited_at`, `page_url`, `referrer`, `visitor_location`, `visitor_ip`, `visitor_org`, `visitor_coordinates`, `visitor_timezone`, `browser_timezone`, `browser_language`, `platform`, `screen_size`, `viewport`, `connection`, and `user_agent`.

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
