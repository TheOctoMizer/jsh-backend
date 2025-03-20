interface jobUrlIdentifier {
  identifier: string;
  timestamp: Date;
}

interface AddJobIdentifierRequest {
  identifier: string;
}

interface GetJobIdentifierRequest {
  key: string;
}

export { AddJobIdentifierRequest, GetJobIdentifierRequest, jobUrlIdentifier };
