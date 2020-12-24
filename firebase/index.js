let admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'olga-jewelry02',
    private_key_id: 'c3eaa7839f1454c615574c71d9032f21f6099077',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxVs1aI6R1b2qg\npGWLHFprIrxsFbEqygcM2xC/hYLbRq9dPD+An9YxM+4WcrhXBdYPdtX0/4vZo22B\nq13R7p44bIsOYVEGyHCjlEagJBDNNtS1oseVf+ULc4Dq939Lz4FbDLWqTyI0WiZk\n6sanwVQQEVdbgV6hliDDWWZ+xUnnCH7RrWDlE4Bai4v/Tb3mvrUq3zuVnvrmpkG1\noT4sa2DdWpCfBW29qKTl6n9QAfeZE7fVxuAgS5TdyuoNf4ScyxtzSn22qfJSwNWp\n6xcrybBEurf8TFrwipuKB12b9bbVdgsXvFpelzSGK8KncBgI2AaK1qd/3AHg9HwN\nz826Hho3AgMBAAECggEAAfAaZLVGAKMxOESDouOyQ0BzwanyWoQu/ooi9+ImyMGl\nfJssxc7kAXv5SpUsrtrD+OhKCe2ETY0LzyJxxIUF2ppTt1pYjyk/6IcKxzONsXMQ\nxlQF4qbX+Go7NZYdyyofK5Zgd9YkirY/fCkqoZOrGP/aLghPDJdTj/7umqJfnomE\nZiOyH91HFKsZS65a+qy/4b9nsuSHC1AXmR+mWRg9sZQx96rbfvVeMgcwMsndiLp+\nnt4oY9hYzyvyf7I/auG4fEqVY+vwcIlg4K9LitDC3vicqjmD46YRzFoQGEaWwJRu\nRFroJkFCk41utB/JHldIUG3d+guj92Ce4uF4phTMOQKBgQDgljx0gP3r7ujmUWgo\nePiU1O6GzpH8H1+c/HJfZzjP2O50paA+xaeCz3lITe4fdqMbEz/+acGe993U+L8L\nlORas+JekgWMrnJluqBL3JR6nYQ3me7zINsmsQSdOF0X+OlncddqW+FZvAmRGBPQ\nOlAiDnebrxYujGavE8yUqffvWQKBgQDKJMSnM4FBCGBZ+gqF/Nq4MnME3GrZx2fr\nPouzT65SpUJFIY2ElhwBtxoXvR/xLsMPfmQdtJt6/Dwy0Wbjgd1T5bCPrmJgWSBb\nD3YVrk1zO1N3clOYIPZfEiJ3G65qX7sao6C4i/KBEyvQIdzg/f0z4plntrIpO63v\n8o6PyaE0DwKBgDjv/b2vojB5blRN2TFBkgvxe9NzdXFM5ume2sQzICUZo0KxZtHj\nPFeej+nzz+XsJufLVpMCbtMFlhjTQ2QFSGtyZXaCYKPM6jW+Pbtd3crEOmv6O6kp\n8EV75WaSjo9wTIQsSWeuiZA9atN9HjDRR9WKg2pV1jLQ54uFYn1iJfhpAoGAeyU9\nHDMXWfv1Xrsh8BBjWnV5doulGHkPSNO4nYs8QqLkpWLUaOJdu3nFjpKrw+1d7bFs\n4l/lnF3PepHxIUY7BGJYVp/A1LtXJ8JaiMi/7CRHK+xdGr9x9+b/Uhpt/eXGAWuP\nfP3cxV9dgJUwj2yL9TDljbZSASaXRyc4TEZkS2cCgYAk0IRzXYqTQr7j9Q9Cux99\nnBIqmstE643vte5BJgF8ttsfyYxy2qBHBIr5CtgA3RCjdJimzeejsc6vh55RHlY9\niAoFjI+JhjmeMAd8eL5pfLVq8b+VTn+dmKvrXtTwdaC8eCICZV1DEEbP+I3c9QNz\nGH/lDMv6Bf48ks2O7daEqw==\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-yutdr@olga-jewelry02.iam.gserviceaccount.com',
    client_id: '113706961449489986460',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yutdr%40olga-jewelry02.iam.gserviceaccount.com',
  }),
})

module.exports = admin
