# ETHAN@DEV - My personal blog

[Explore my journey here!](https://www.ethanlam.dev/)

This blog uses **[Vue.js](https://vuejs.org/)** and **[Tailwind CSS](https://tailwindcss.com/)** for the frontend, **[Django](https://www.djangoproject.com/)** for the backend, and **[GraphQL](https://graphql.org/)** as API manipulation to communicate between them. The static site is hosted and automated using **[Netlify](https://www.netlify.com/)**. While the backend is deployed to **[AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)**, leveraging multiple AWS services like **[EC2](https://aws.amazon.com/ec2/)** for compute instances, **[RDS](https://aws.amazon.com/rds/)** for Postgres databases, and **[S3](https://aws.amazon.com/s3/)** for static files storage.

For more details about the packages, libraries and frameworks used in this project, please refer to the following sections.

## Frontend(Vue.js)

- [**Tailwind CSS**](https://tailwindcss.com/) for styling
- [**Vue Apollo**](https://v4.apollo.vuejs.org/) for GraphQL integration
- [**Pinia**](https://pinia.vuejs.org/) for state management
- [**Prism.js**](https://prismjs.com/index.html) for code block highlighting
- [**Type.js**](https://github.com/mattboldt/typed.js/) for typing animation
- [**Twemoji**](https://twemoji.twitter.com/) and [**FontAwsome**](https://fontawesome.com/v6/docs/web/use-with/vue/) for assets like emojis and icons

## Backend(Django)

- **[Django CKEditor](https://django-ckeditor.readthedocs.io/en/latest/#id39)** for content creation and management in django admin
- **[Graphene-Django](https://docs.graphene-python.org/projects/django/en/latest/)** for GraphQL integration
- **[Django GraphQL JWT](https://django-graphql-jwt.domake.io/index.html)** for JSON Web Token authentication for Graphene Django
- [**django-cors-headers**](https://pypi.org/project/django-cors-headers/) for handling the server headers required for Cross-Origin Resource Sharing (CORS)
- [**django-storages**](https://django-storages.readthedocs.io/en/latest/) and [**Boto3**](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html#) for AWS S3 integration
- [**Psycopg**](https://pypi.org/project/psycopg2-binary/) to support PostgreSQL database for Python

A huge thanks to [**Leo’s blog**](https://www.leohuynh.dev/) and the **open source community**!