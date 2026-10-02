import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

/**
 * Cache the reCAPTCHA client instance (recommended by Google documentation)
 */
let recaptchaClientInstance: RecaptchaEnterpriseServiceClient | null = null;

export function getRecaptchaClient(): RecaptchaEnterpriseServiceClient {
  if (!recaptchaClientInstance) {
    recaptchaClientInstance = new RecaptchaEnterpriseServiceClient();
  }
  return recaptchaClientInstance;
}

export interface CreateAssessmentOptions {
  projectID?: string;
  recaptchaKey?: string;
  token?: string;
  recaptchaAction?: string;
}

export interface DetailedAssessmentResponse {
  valid: boolean;
  score: number | null;
  action?: string | null;
  reasons: string[];
  invalidReason?: string | null;
  error?: string | null;
}

/**
 * Create an assessment to analyse the risk of a UI action.
 *
 * projectID: Your Google Cloud project ID.
 * recaptchaSiteKey: The reCAPTCHA key associated with the site/app
 * token: The generated token obtained from the client.
 * recaptchaAction: Action name corresponding to the token.
 */
export async function createAssessment({
  projectID = process.env.RECAPTCHA_PROJECT_ID || "puhayt-digital",
  recaptchaKey = process.env.RECAPTCHA_SITE_KEY || "6LePj9UtAAAAAC1nRT_ORs0b94_h2LDouwAP53nL",
  token = "action-token",
  recaptchaAction = "action-name",
}: CreateAssessmentOptions = {}): Promise<number | null> {
  try {
    // Create the reCAPTCHA client.
    // Client is cached via getRecaptchaClient() as recommended in Google documentation.
    const client = getRecaptchaClient();
    const projectPath = client.projectPath(projectID);

    // Build the assessment request.
    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response.tokenProperties || !response.tokenProperties.valid) {
      console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
      return null;
    }

    // Check if the expected action was executed.
    // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
    if (response.tokenProperties.action === recaptchaAction) {
      // Get the risk score and the reason(s).
      // For more information on interpreting the assessment, see:
      // https://cloud.google.com/recaptcha/docs/interpret-assessment
      const score = response.riskAnalysis?.score ?? null;
      console.log(`The reCAPTCHA score is: ${score}`);
      if (response.riskAnalysis?.reasons) {
        response.riskAnalysis.reasons.forEach((reason) => {
          console.log(reason);
        });
      }

      return score;
    } else {
      console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
      return null;
    }
  } catch (error: any) {
    console.warn("reCAPTCHA Enterprise createAssessment notice:", error?.message || error);
    return null;
  }
}

/**
 * Detailed assessment function returning score, valid state, and risk reasons for API clients.
 */
export async function createDetailedAssessment({
  projectID = process.env.RECAPTCHA_PROJECT_ID || "puhayt-digital",
  recaptchaKey = process.env.RECAPTCHA_SITE_KEY || "6LePj9UtAAAAAC1nRT_ORs0b94_h2LDouwAP53nL",
  token = "action-token",
  recaptchaAction = "submit",
}: CreateAssessmentOptions = {}): Promise<DetailedAssessmentResponse> {
  try {
    const client = getRecaptchaClient();
    const projectPath = client.projectPath(projectID);

    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    if (!response.tokenProperties || !response.tokenProperties.valid) {
      const reason = response.tokenProperties?.invalidReason ? String(response.tokenProperties.invalidReason) : "INVALID_TOKEN";
      console.log(`The CreateAssessment call failed because the token was: ${reason}`);
      return {
        valid: false,
        score: null,
        reasons: [],
        invalidReason: reason,
      };
    }

    const reasons = (response.riskAnalysis?.reasons || []).map((r) => String(r));
    const score = response.riskAnalysis?.score ?? null;

    if (response.tokenProperties.action === recaptchaAction) {
      console.log(`The reCAPTCHA score is: ${score}`);
      reasons.forEach((reason) => console.log(reason));

      return {
        valid: true,
        score,
        action: response.tokenProperties.action,
        reasons,
      };
    } else {
      console.log(`The action attribute (${response.tokenProperties.action}) does not match expected (${recaptchaAction})`);
      return {
        valid: false,
        score,
        action: response.tokenProperties.action,
        reasons,
        invalidReason: `ACTION_MISMATCH: expected '${recaptchaAction}', got '${response.tokenProperties.action}'`,
      };
    }
  } catch (error: any) {
    console.warn("reCAPTCHA Enterprise detailed assessment notice:", error?.message || error);
    return {
      valid: false,
      score: null,
      reasons: [],
      error: error?.message || "Assessment unavailable",
    };
  }
}
