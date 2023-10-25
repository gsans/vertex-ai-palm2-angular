import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import * as vertex from '../models/vertex-ai-types';
import * as palm from '../models/palm-types';

@Component({
  selector: 'app-root',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {
  title = 'vertex-ai-palm2-angular';

  constructor(public http: HttpClient) {
  }

  ngOnInit(): void {
    this.TestPalmWithApiKey();
    //this.TestVertexAIWithoutApiKey();
  }

  TestPalmWithApiKey() {
    const prompt: palm.TextRequest = palm.createPrompt("What is the largest number with a name?");
    const endpoint = this.buildEndpointUrlApiKey(environment.API_KEY);

    this.http.post<palm.TextResponse>(endpoint, prompt)
      .subscribe(response => {
        console.log(response.candidates?.[0].output);
      });
  }

  TestVertexAIWithoutApiKey() {
    const prompt: vertex.TextRequest = vertex.createPrompt("What is the largest number with a name?");
    const endpoint = this.buildEndpointUrl(environment.PROJECT_ID);
    let headers = this.getAuthHeaders(environment.GCLOUD_AUTH_PRINT_ACCESS_TOKEN);

    this.http.post<vertex.TextResponse>(endpoint, prompt, { headers })
      .subscribe(response => {
        console.log(response.predictions[0].content);
      });
  }

  buildEndpointUrl(projectId: string) {
    const BASE_URL = "https://us-central1-aiplatform.googleapis.com/";
    const API_VERSION = 'v1';        // may be different at this time
    const MODEL = 'text-bison';

    let url = BASE_URL;              // base url
    url += API_VERSION;              // api version
    url += "/projects/" + projectId; // project id
    url += "/locations/us-central1"; // google cloud region
    url += "/publishers/google";     // publisher
    url += "/models/" + MODEL;       // model
    url += ":predict";               // action

    return url;
  }

  buildEndpointUrlApiKey(apikey: string) {
    const BASE_URL = "https://generativelanguage.googleapis.com/";
    const API_VERSION = 'v1beta2';   // may be different at this time Eg: v1, v2, etc
    const MODEL = 'text-bison-001';  // may be different at this time

    let url = BASE_URL;              // base url
    url += API_VERSION;              // api version
    url += "/models/" + MODEL        // model
    url += ":generateText";          // action
    url += "?key=" + apikey;         // api key

    return url;
  }

  getAuthHeaders(accessToken: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);
    return headers;
  }

}
